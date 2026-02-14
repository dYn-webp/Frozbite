import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

// Fungsi untuk meng-update status pesanan
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // Params sekarang adalah Promise
) {
  try {
    await connectToDatabase();
    
    // TUNGGU (await) params-nya dulu sebelum dipakai
    const { id } = await params; 
    
    const { status } = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status berhasil diubah", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Gagal mengubah status" }, { status: 500 });
  }
}