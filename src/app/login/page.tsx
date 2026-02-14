"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Snowflake } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { redirect: false, email: form.email, password: form.password });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/"); // Jika sukses, kembali ke beranda
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <Link href="/" className="flex items-center justify-center gap-2 text-blue-700 font-bold text-2xl mb-8">
          <Snowflake className="w-8 h-8" /> FrozBite <span className="text-orange-500">Solutions</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Login ke Akun Anda</h2>
        
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-semibold text-slate-600">Email</label><input required type="email" onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-semibold text-slate-600">Password</label><input required type="password" onChange={(e)=>setForm({...form, password: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mt-4">{loading ? "Memproses..." : "Masuk"}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Belum punya akun? <Link href="/register" className="text-orange-500 font-bold hover:underline">Daftar sekarang</Link></p>
      </div>
    </div>
  );
}