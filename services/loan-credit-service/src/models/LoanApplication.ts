// LoanApplication.schema.ts
import { Schema, model, Types,Document } from "mongoose";




export interface ILoanApplication extends Document{
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  loanProductId: Types.ObjectId;

  requestedAmount: number;

  approvedAmount?: number;

  tenureInMonths: 3 | 6 | 9;

  annualInterestRate: number;

  emiAmount?: number;
  totalPayableAmount?: number;

  status:
    | "APPLIED"
    | "APPROVED"
    | "DISBURSED"
    | "ACTIVE"
    | "CLOSED"
    | "REJECTED"
    | "DEFAULTED";

  approvedBy?: Types.ObjectId;

  disbursedAt?: Date;
  closedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}


const LoanApplicationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },

    loanProductId: {
      type: Types.ObjectId,
      ref: "LoanProduct",
      required: true,
    },

    requestedAmount: {
      type: Number,
      required: true,
    },

    approvedAmount: {
      type: Number,
    },

    tenureInMonths: {
      type: Number,
      enum: [3, 6, 9],
      required: true,
    },

    annualInterestRate: {
      type: Number,
      required: true,
    },

    emiAmount: Number,
    totalPayableAmount: Number,

    status: {
      type: String,
      enum: [
        "APPLIED",
        "APPROVED",
        "DISBURSED",
        "ACTIVE",
        "CLOSED",
        "REJECTED",
        "DEFAULTED",
      ],
      default: "APPLIED",
    },

    approvedBy: {
      type: Types.ObjectId,
      ref: "Admin",
    },

    disbursedAt: Date,
    closedAt: Date,
  },
  { timestamps: true }
);

export const LoanApplication = model<ILoanApplication>(
  "LoanApplication",
  LoanApplicationSchema
);
