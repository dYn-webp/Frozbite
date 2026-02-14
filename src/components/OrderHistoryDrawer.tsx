"use client";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ReceiptText, Clock, Package, CheckCircle } from "lucide-react";

export default function OrderHistoryDrawer() {
  const { isHistoryOpen, setIsHistoryOpen, orders } = useCart();

  const formatRupiah = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const getStatusColor = (status: string) => {
    if (status === "Menunggu Konfirmasi") return "bg-orange-100 text-orange-600";
    if (status === "Diproses") return "bg-blue-100 text-blue-600";
    return "bg-green-100 text-green-600";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Menunggu Konfirmasi") return <Clock size={14} />;
    if (status === "Diproses") return <Package size={14} />;
    return <CheckCircle size={14} />;
  };

  return (
    <AnimatePresence>
      {isHistoryOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHistoryOpen(false)} className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-50 z-[70] shadow-2xl flex flex-col">
            
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><ReceiptText className="text-blue-600" /> Riwayat Pesanan</h2>
              <button onClick={() => setIsHistoryOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-red-100 text-slate-500"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 mt-10"><ReceiptText size={64} className="mb-4 opacity-20" /><p>Belum ada riwayat pesanan.</p></div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500">{order.date}</p>
                        <p className="font-bold text-slate-800">{order.id}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.quantity} x {formatRupiah(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Total Belanja</span>
                      <span className="font-bold text-lg text-blue-600">{formatRupiah(order.total)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}