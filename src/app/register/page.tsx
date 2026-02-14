"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Snowflake } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <Link href="/" className="flex items-center justify-center gap-2 text-blue-700 font-bold text-2xl mb-8">
          <Snowflake className="w-8 h-8" /> FrozBite <span className="text-orange-500">Solutions</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Daftar Akun Baru</h2>
        
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-semibold text-slate-600">Nama Lengkap</label><input required type="text" onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-semibold text-slate-600">Email</label><input required type="email" onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-semibold text-slate-600">Password</label><input required type="password" onChange={(e)=>setForm({...form, password: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mt-4">{loading ? "Memproses..." : "Daftar Sekarang"}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login di sini</Link></p>
      </div>
    </div>
  );
}