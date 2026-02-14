"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products, testimonials, Product } from "@/data/dummyData";
import { CheckCircle2, Truck, BadgeDollarSign, ShieldCheck, Smartphone, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const filters: string[] = ["Semua", "Ayam", "Seafood", "Nugget"];

  const filteredProducts: Product[] = activeFilter === "Semua" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <>
      <Hero />

      {/* Tentang Kami */}
      <section id="tentang" className="bg-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">
            Tentang Kami
          </motion.h2>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Mitra Terpercaya Sejak 2020
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-600 mb-8">
            Menyediakan produk frozen food berkualitas tinggi, higienis, dan terjangkau untuk kebutuhan keluarga maupun bisnis Anda.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col md:flex-row justify-center gap-6 text-slate-800 font-medium">
            <div className="flex items-center justify-center gap-2"><CheckCircle2 className="text-blue-600"/> Cepat & Tepat Waktu</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle2 className="text-blue-600"/> Harga Terjangkau</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle2 className="text-blue-600"/> Aman & Higienis</div>
          </motion.div>
        </div>
      </section>

      {/* Produk */}
      <section id="produk" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Produk Unggulan</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Kenapa Pilih Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { icon: Truck, title: "Pengiriman Cepat", desc: "Barang tiba di hari yang sama untuk area tertentu." },
              { icon: BadgeDollarSign, title: "Harga Bersaing", desc: "Dapatkan harga terbaik untuk kualitas premium." },
              { icon: ShieldCheck, title: "Jaminan Fresh", desc: "Disimpan dalam suhu standar untuk menjaga kualitas." },
              { icon: Smartphone, title: "Pemesanan Mudah", desc: "Pesan via WhatsApp dengan admin yang responsif." }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon size={32} />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Testimoni Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <motion.div key={testi.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(testi.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic mb-6">"{testi.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{testi.name}</h5>
                    <p className="text-xs text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Langkah Pemesanan */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">3 Langkah Mudah Memesan</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
            {[
              { num: "1.", text: "Pilih Produk" },
              { num: "2.", text: "Hubungi Kami" },
              { num: "3.", text: "Pesanan Dikirim" }
            ].map((step, idx) => (
              <div key={idx} className="bg-white px-8 py-4 mb-8 md:mb-0">
                <div className="text-5xl font-black text-blue-600 mb-2">{step.num}</div>
                <div className="font-bold text-slate-800">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="kontak" className="py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
            Butuh Stok Frozen Food Berkualitas Sekarang?
          </h2>
          {/* Ubah button menjadi tag anchor (a) */}
          <a 
            href="https://wa.me/6287824891003?text=Halo%20FrozBite,%20saya%20tertarik%20untuk%20menjadi%20mitra/memesan%20stok%20Frozen%20Food." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-fit gap-2 mx-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-lg transition shadow-xl shadow-orange-500/20 hover:-translate-y-1"
          >
            <MessageCircle size={24} />
            Hubungi Kami via WhatsApp
          </a>
        </motion.div>
      </section>

      {/* WhatsApp Mengambang */}
      <a 
        href="https://wa.me/6287824891003?text=Halo%20Admin%20FrozBite,%20saya%20butuh%20bantuan." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}