"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="beranda" className="relative max-w-7xl mx-auto px-6 pt-10 pb-20 lg:pt-20 flex flex-col-reverse lg:flex-row items-center gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center lg:text-left"
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Frozen Food <br className="hidden lg:block" />
          <span className="text-blue-700">Berkualitas, Cepat</span> <br />
          & Terpercaya
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
          Solusi praktis, higienis, dan terjangkau. Siap kirim kapan saja, tanpa ribet. Pilihan tepat untuk keluarga dan bisnis Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link href="#produk" className="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition shadow-lg shadow-orange-500/30">
            Lihat Produk
          </Link>
          <Link href="#kontak" className="w-full sm:w-auto px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full font-medium transition">
            Tanya via WhatsApp
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 relative"
      >
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800" 
            alt="Frozen Food Assortment" 
            className="rounded-3xl shadow-2xl object-cover w-full h-full relative z-10 border-4 border-white"
          />
        </div>
      </motion.div>
    </section>
  );
}