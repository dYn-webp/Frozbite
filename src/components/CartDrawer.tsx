"use client";
import { useCart, Order as ContextOrder } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle2, Truck, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, addOrder } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", method: "transfer" });
  
  const { data: session, status } = useSession();

  useEffect(() => {
    const userName = session?.user?.name;
    if (userName) {
      setFormData(prev => ({ ...prev, name: userName }));
    }
  }, [session]);

  const formatRupiah = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  // FUNGSI 1: TETAP VIA WA (KHUSUS YANG TIDAK LOGIN/TAMU)
  const handleWhatsAppCheckout = () => {
    let textWA = `*Halo FrozBite, saya mau pesan (Tanpa Login):*\n\n`;
    cartItems.forEach((item, i) => {
      textWA += `${i + 1}. ${item.name} (${item.quantity}x) = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    textWA += `\n*TOTAL: ${formatRupiah(cartTotal)}*\n\nApakah stoknya masih ada?`;
    window.open(`https://wa.me/6287824891003?text=${encodeURIComponent(textWA)}`, '_blank');
  };

  // FUNGSI 2: CHECKOUT WEB (LANGSUNG KE DATABASE MONGODB!)
  const handleWebCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
    
    // Siapkan data untuk dikirim ke Database
    const orderData = {
      invoice: invoiceId,
      userEmail: session?.user?.email || "guest",
      items: cartItems,
      total: cartTotal,
      status: "Menunggu Konfirmasi",
      customer: formData
    };

    try {
      // 1. Kirim diam-diam ke Database MongoDB
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        // 2. Simpan juga ke Riwayat Lokal HP (agar langsung muncul di menu riwayat)
        const newOrderContext: ContextOrder = {
          id: invoiceId,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          items: [...cartItems],
          total: cartTotal,
          status: "Menunggu Konfirmasi",
          customer: formData
        };
        addOrder(newOrderContext);

        // 3. Langsung Tampilkan Layar Sukses (TANPA BUKA WA)
        clearCart(); 
        setStep("success"); 
      } else {
        alert("Gagal memproses pesanan ke server.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep("cart"), 300); 
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
            
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                {step === "checkout" && <button onClick={() => setStep("cart")} className="p-2 -ml-2 text-slate-500"><ArrowLeft size={20} /></button>}
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {step === "success" ? "Pesanan Berhasil" : step === "checkout" ? "Checkout Member" : <><ShoppingBag className="text-blue-600" /> Keranjang</>}
                </h2>
              </div>
              <button onClick={handleClose} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50">
              {step === "cart" && (
                <div className="p-5 flex flex-col gap-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400 mt-10"><ShoppingBag size={64} className="mb-4 opacity-20" /><p>Keranjang kosong</p></div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 border border-slate-100 bg-white p-3 rounded-2xl shadow-sm">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div><h4 className="font-semibold text-slate-800 text-sm line-clamp-2">{item.name}</h4><p className="text-blue-600 font-bold mt-1">{formatRupiah(item.price)}</p></div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 px-2 text-slate-600 hover:bg-slate-200"><Minus size={16} /></button>
                              <input type="number" min="1" value={item.quantity.toString()} onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val) && val > 0) updateQuantity(item.id, val); }} className="w-10 text-center font-semibold text-sm bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none" />
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 px-2 text-slate-600 hover:bg-slate-200"><Plus size={16} /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {step === "checkout" && (
                <form id="checkout-form" onSubmit={handleWebCheckout} className="p-5 flex flex-col gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Truck size={18} className="text-blue-600"/> Data Pengiriman</h3>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nama Lengkap</label><input required type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none" /></div>
                      <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nomor WhatsApp</label><input required type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none" /></div>
                      <div><label className="block text-xs font-semibold text-slate-500 mb-1">Alamat Lengkap</label><textarea required rows={3} value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"></textarea></div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Metode Pembayaran</h3>
                    <select value={formData.method} onChange={(e)=>setFormData({...formData, method: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none">
                      <option value="transfer">Transfer Bank (BCA / Mandiri)</option>
                      <option value="cod">Bayar di Tempat (COD)</option>
                    </select>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center mt-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={50} /></motion.div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Yeay, Pesanan Masuk!</h3>
                  <p className="text-slate-500 text-sm mb-8">Pesanan Anda telah masuk ke sistem kami secara otomatis. Cek status pesanan di menu Riwayat.</p>
                  <button onClick={handleClose} className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl">Kembali Belanja</button>
                </div>
              )}
            </div>

            {step === "cart" && cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-medium">Total Harga</span>
                  <span className="text-2xl font-bold text-slate-900">{formatRupiah(cartTotal)}</span>
                </div>
                
                <button 
                  onClick={() => {
                    if (status === "unauthenticated") {
                      signIn(); 
                    } else {
                      setStep("checkout");
                    }
                  }} 
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} /> Checkout di Web (Member)
                </button>
                
                <button onClick={handleWhatsAppCheckout} className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> Pesan via WA (Tanpa Login)
                </button>
              </div>
            )}

            {step === "checkout" && (
              <div className="p-6 bg-white border-t">
                <button type="submit" form="checkout-form" disabled={isLoading} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg flex justify-center items-center">
                  {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" /> : `Buat Pesanan - ${formatRupiah(cartTotal)}`}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}