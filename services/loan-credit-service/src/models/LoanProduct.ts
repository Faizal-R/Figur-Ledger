// LoanProduct.schema.ts
import { Schema, model, Types,Document } from "mongoose";

export interface ILoanProduct extends Document {
  _id: Types.ObjectId;

  code: string;

  name: string;

  minAmount: number;
  maxAmount: number;

  annualInterestRate: number;

  allowedTenuresInMonths: Array<3 | 6 | 9>;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}


const LoanProductSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // e.g. "PL_SHORT_TERM"
    },

    name: {
      type: String,
      required: true, // "Personal Loan"
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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const LoanProduct = model<ILoanProduct>("LoanProduct", LoanProductSchema);
