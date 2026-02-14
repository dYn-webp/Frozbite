"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/dummyData";

export interface CartItem extends Product {
  quantity: number;
}

// 1. Tambahkan struktur data untuk Riwayat Pesanan
export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Menunggu Konfirmasi" | "Diproses" | "Sedang Dikirim";
  customer: { name: string; phone: string; address: string; method: string };
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // State baru untuk Riwayat
  orders: Order[];
  addOrder: (order: Order) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 2. State untuk Riwayat Pesanan
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 3. Ambil riwayat dari memori HP pelanggan saat web dibuka
  useEffect(() => {
    const savedOrders = localStorage.getItem("frozbite_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => setCartItems((prev) => prev.filter((item) => item.id !== productId));
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };
  const clearCart = () => setCartItems([]);

  // 4. Fungsi menyimpan pesanan ke memori HP pelanggan
  const addOrder = (order: Order) => {
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem("frozbite_orders", JSON.stringify(newOrders));
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      orders, addOrder, isHistoryOpen, setIsHistoryOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}