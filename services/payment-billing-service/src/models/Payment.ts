import mongoose, { Document } from "mongoose";



export interface IPayment extends Document {
  type: "BILL_PAYMENT";

  payerUserId: string;
  payerAccountId: string;

  payeeType?: "BILLER";
  payeeId?: string;
  payeeAccountId?: string;
  amount: number;

  status?: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED" | "REFUNDED";

  referenceId?: string;   // consumer number or external reference
  transactionId?: string; // returned from transaction service

  settled?: boolean;
  settledAt?: Date;

  createdAt?: Date;
  completedAt?: Date;
}


const PaymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["BILL_PAYMENT"],
    required: true,
  },
  payerUserId: {
    type: String,
    required: true,
  },
  payerAccountId: {
    type: String,
    required: true,
  },
  payeeType: {
    type: String,
    enum: ["BILLER"],
  },
 payeeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Biller",
  required: true,
  index: true,
},
  payeeAccountId:String,
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "SUCCESS", "FAILED", "REFUNDED"],
    default: "PENDING",
  },
  referenceId: String, // Consumer number, 
  transactionId: String, // From Transaction Service
  
  settled: {
    type: Boolean,
    default: false,
  },
  settledAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
});

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
