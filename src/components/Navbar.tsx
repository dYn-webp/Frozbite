"use client";
import { useState, useEffect } from "react";
import { Snowflake, Menu, X, ShoppingCart, ReceiptText, User, LogOut, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Mengambil state dari CartContext
  const { cartCount, setIsCartOpen, setIsHistoryOpen } = useCart();
  
  // Mengambil status login dari NextAuth
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 text-blue-700 font-bold text-2xl">
          <Snowflake className="w-8 h-8" />
          FrozBite <span className="text-orange-500 font-medium text-lg hidden md:inline">Solutions</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          <Link href="#beranda" className="hover:text-blue-600 transition">Beranda</Link>
          <Link href="#produk" className="hover:text-blue-600 transition">Produk</Link>

          {/* Ikon Fitur: Riwayat & Keranjang */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
            <button 
              onClick={() => setIsHistoryOpen(true)} 
              className="p-2 text-slate-600 hover:text-blue-600 transition" 
              title="Riwayat Pesanan"
            >
              <ReceiptText size={22} />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 text-slate-600 hover:text-blue-600 transition" 
              title="Keranjang Belanja"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* User & Auth Section */}
          <div className="flex items-center gap-3 ml-2">
            {session ? (
              <div className="flex items-center gap-3">
                {/* Tombol Dashboard khusus Admin */}
                {(session.user as any)?.role === "admin" && (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-1.5 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-orange-200 transition"
                  >
                    <ShieldCheck size={14} /> Admin Panel
                  </Link>
                )}

                {/* Nama User */}
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <User size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-700 font-semibold truncate max-w-[100px]">
                    {session.user?.name}
                  </span>
                </div>

                {/* Tombol Logout */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>

        {/* Mobile View Icons */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsHistoryOpen(true)} className="p-2 text-slate-800">
            <ReceiptText size={22} />
          </button>
          
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-slate-800">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button className="text-slate-800 ml-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 border-t animate-in fade-in slide-in-from-top-2">
          {session && (
            <div className="pb-4 border-b flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Sudah Masuk Sebagai</p>
                <p className="font-bold text-slate-800">{session.user?.name}</p>
              </div>
              <button onClick={() => signOut()} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1 rounded-lg">
                Keluar
              </button>
            </div>
          )}
          <Link href="#beranda" onClick={() => setIsOpen(false)} className="font-medium text-slate-600">Beranda</Link>
          <Link href="#produk" onClick={() => setIsOpen(false)} className="font-medium text-slate-600">Produk</Link>
          
          {/* Admin Link di Mobile */}
          {(session?.user as any)?.role === "admin" && (
            <Link 
              href="/admin" 
              className="text-orange-600 font-bold flex items-center gap-2" 
              onClick={() => setIsOpen(false)}
            >
              <ShieldCheck size={18} /> Admin Panel
            </Link>
          )}
          
          {!session && (
            <Link 
              href="/login" 
              className="text-center py-3 bg-blue-600 text-white rounded-xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              Masuk / Daftar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}