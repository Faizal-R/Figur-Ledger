// LoanProduct.schema.ts
import { Schema, model, Types, Document } from "mongoose";

export interface ILoanProduct extends Document {
  _id: Types.ObjectId;

  code: string;

  name: string;
  minCreditScore: number;
  minAmount: number;
  maxAmount: number;

  annualInterestRate: number;

  allowedTenuresInMonths: Array<3 | 6 | 9>;

  isActive: boolean;
  allowedAccountTypes: ("SAVINGS" | "BUSINESS")[];
  gracePeriodDays: number;
  // allowPrepayment: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const LoanProductSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true, 
    },
    minCreditScore: {
      type: Number,
      required: true,
    },

    minAmount: {
      type: Number,
      required: true,
    },

    maxAmount: {
      type: Number,
      required: true,
    },

    annualInterestRate: {
      type: Number,
      required: true, // APR
    },

    allowedTenuresInMonths: {
      type: [Number],
      enum: [3, 6, 9],
      default: [3, 6, 9],
      required: true,
    },
    allowedAccountTypes: {
      type: [String],
      enum: ["SAVINGS", "BUSINESS"],
      // required: true,
    },

    gracePeriodDays: {
      type: Number,
      default: 3,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const LoanProduct = model<ILoanProduct>(
  "LoanProduct",
  LoanProductSchema
);
