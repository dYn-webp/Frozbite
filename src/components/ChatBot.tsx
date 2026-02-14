"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Halo! Saya Frozzy ❄️. Ada yang bisa saya bantu seputar produk FrozBite?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      
      if (data.reply) {
        setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "ai", text: data.reply }]);
      } else {
        throw new Error("No reply");
      }
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "ai", text: "Maaf, sistem AI sedang sibuk. Coba lagi nanti ya!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tombol Buka Chat (Mengambang di Kiri Bawah agar tidak tabrakan dengan WhatsApp) */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 hover:scale-110 transition-transform flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
      >
        <Bot size={28} />
      </button>

      {/* Jendela Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Frozzy AI</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1"><Sparkles size={10} /> Online 24/7</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            {/* Area Pesan */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.sender === "user" ? "bg-slate-200 text-slate-600" : "bg-blue-100 text-blue-600"}`}>
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya Frozzy di sini..." 
                className="flex-1 bg-slate-100 text-slate-800 text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}