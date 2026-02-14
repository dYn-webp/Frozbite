import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    await connectToDatabase();

    // Cek apakah email sudah pernah dipakai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar! Silakan Login." }, { status: 400 });
    }

    // Acak password agar tidak bisa dibaca hacker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan akun baru ke database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({ message: "Registrasi berhasil!" }, { status: 201 });
  } catch (error) {
    console.error("Error Register:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}