// src/components/ProductCard.tsx
"use client";
import { motion } from "framer-motion";
import { Product } from "@/data/dummyData";
import { useCart } from "@/context/CartContext"; 
import { ShoppingCart } from "lucide-react"; 

interface ProductCardProps {
  product: Product;
  delay: number;
}

export default function ProductCard({ product, delay }: ProductCardProps) {
  const { addToCart } = useCart(); // Pakai fungsi addToCart dari context

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
    >
      <div className="relative h-48 w-full shrink-0">
        {product.isPromo && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
            PROMO
          </div>
        )}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xl font-bold text-blue-600 mb-4">{formatRupiah(product.price)}</p>

        {/* Tombol diubah menjadi Tambah Keranjang */}
        <button 
          onClick={() => addToCart(product)} 
          className="mt-auto w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-100 font-medium rounded-xl transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Tambah Keranjang
        </button>
      </div>
    </motion.div>
  );
}