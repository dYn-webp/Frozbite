"use client";
import { useState, useEffect } from "react";
import { Snowflake, Menu, X, ShoppingCart, ReceiptText } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // PERBAIKAN: Memanggil setIsHistoryOpen dari context
  const { cartCount, setIsCartOpen, setIsHistoryOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-700 font-bold text-2xl">
          <Snowflake className="w-8 h-8" />
          FrozBite <span className="text-orange-500 font-medium text-lg">Solutions</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="#beranda" className="hover:text-blue-600 transition">Beranda</Link>
          <Link href="#tentang" className="hover:text-blue-600 transition">Tentang Kami</Link>
          <Link href="#produk" className="hover:text-blue-600 transition">Produk</Link>
          <Link href="#kontak" className="hover:text-blue-600 transition">Kontak</Link>

          {/* PERBAIKAN: Pisahkan Tombol Riwayat dan Keranjang di Desktop */}
          <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
            <button 
              onClick={() => setIsHistoryOpen(true)} 
              className="p-2 text-slate-600 hover:text-blue-600 transition"
              title="Riwayat Pesanan"
            >
              <ReceiptText size={24} />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 text-slate-600 hover:text-blue-600 transition"
              title="Keranjang Belanja"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <Link href="#kontak" className="px-5 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            Hubungi Kami
          </Link>
        </div>

        {/* PERBAIKAN: Pisahkan Tombol Riwayat dan Keranjang di Mobile */}
        <div className="md:hidden flex items-center gap-4">
          
          <button onClick={() => setIsHistoryOpen(true)} className="p-2 text-slate-800" title="Riwayat Pesanan">
            <ReceiptText size={24} />
          </button>

          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-slate-800" title="Keranjang Belanja">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                 {cartCount}
               </span>
            )}
          </button>

          {/* Tombol Hamburger */}
          <button className="text-slate-800 ml-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4">
          <Link href="#beranda" onClick={() => setIsOpen(false)}>Beranda</Link>
          <Link href="#tentang" onClick={() => setIsOpen(false)}>Tentang Kami</Link>
          <Link href="#produk" onClick={() => setIsOpen(false)}>Produk</Link>
          <Link href="#kontak" className="text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Hubungi Kami</Link>
        </div>
      )}
    </nav>
  );
}