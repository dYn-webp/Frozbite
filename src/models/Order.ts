import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  invoice: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    method: string;
    email?: string;
  };
  items: any[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    invoice: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      method: { type: String, required: true },
      email: { type: String }, 
    },
    // KUNCI PERBAIKAN: Gunakan Inline Object Array. 
    // TypeScript sangat menyukai format seperti ini.
    items: { 
      type: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true }
        }
      ], 
      required: true, 
      default: [] 
    },
    total: { type: Number, required: true },
    status: { 
      type: String, 
      default: "Menunggu Konfirmasi",
      enum: ["Menunggu Konfirmasi", "Diproses", "Sedang Dikirim", "Selesai"] 
    },
  },
  { timestamps: true }
);

// Mencegah error OverwriteModelError saat Next.js melakukan recompile
export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);