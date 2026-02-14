import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

// Fungsi untuk membuat pesanan baru (dari pelanggan)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    const newOrder = new Order(body);
    await newOrder.save();

    return NextResponse.json({ message: "Pesanan berhasil dibuat!", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ message: "Gagal membuat pesanan" }, { status: 500 });
  }
}

// Fungsi untuk mengambil semua pesanan (untuk Admin)
export async function GET() {
  try {
    await connectToDatabase();
    // Mengambil semua pesanan, diurutkan dari yang paling baru
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Gagal mengambil data pesanan" }, { status: 500 });
  }
}