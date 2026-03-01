
import mongoose from "mongoose";

export interface IUsersSavedBillers extends mongoose.Document {
  userId: string;
  billerId: string;
  category: "ELECTRICITY" | "WATER";
  consumerId: string; // EB123456 for electricity, WB-1234-5678 for water
  alias?: string; // "My Home Electricity"
  lastPaidAmount?: number;
  lastPaidDate?: Date;
  isActive: boolean;
}

const UsersSavedBillersSchema = new mongoose.Schema<IUsersSavedBillers>(
  {
    userId: { type: String, required: true, index: true },
    billerId: { type: String, required: true, index: true },
    category: { 
      type: String, 
      enum: ["ELECTRICITY", "WATER"], 
      required: true 
    },
    consumerId: { type: String, required: true },
    alias: { type: String },
    lastPaidAmount: { type: Number },
    lastPaidDate: { type: Date },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);



export const UsersSavedBillers = mongoose.model<IUsersSavedBillers>("UsersSavedBillers", UsersSavedBillersSchema);