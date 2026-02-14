import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

// Fungsi untuk meng-update status pesanan
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { status } = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id, 
      { status }, 
      { new: true }
    );

    return NextResponse.json({ message: "Status berhasil diubah", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Gagal mengubah status" }, { status: 500 });
  }
}