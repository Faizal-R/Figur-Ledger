import mongoose, { Document, Schema, model } from "mongoose";
export interface IInvoice extends Document {
  billNumber: string;
  billerId: string;
  savedBillerId: string;
  payerUserId: string;
  payerAccountId: string;
  totalAmount: number;
  dueDate: Date;
  breakdown: { description: string; amount: number }[];
  status: "PENDING" | "PROCESSING" | "PAID" | "FAILED" | "EXPIRED";
}

const BreakdownSchema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }, // prevent unnecessary subdocument ids
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    billerId: {
      type: String,
      required: true,
      index: true,
    },

    savedBillerId: {
      type: String,
      required: true,
      index: true,
    },

    payerUserId: {
      type: String,
      required: true,
      index: true,
    },

    payerAccountId: {
      type: String,
      required: true,
      index: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
      index: true,
    },

    breakdown: {
      type: [BreakdownSchema],
      required: true,
      default: [],
    },

    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "PAID", "FAILED", "EXPIRED"],
      default: "PENDING",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

InvoiceSchema.index(
  { billNumber: 1, payerAccountId: 1 },
  { unique: true }
);

export const Invoice = model<IInvoice>("Invoice", InvoiceSchema);
