
import { Schema, model, Types,Document} from "mongoose";

export interface IRepaymentSchedule extends Document {
  _id: Types.ObjectId;

  loanApplicationId: Types.ObjectId;

  scheduleNumber: number;

  dueDate: Date;

  principalAmount: number;
  interestAmount: number;
  totalAmount: number;

  status: "PENDING" | "PAID" | "OVERDUE";
  outstandingPrincipal: number;
  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}


const RepaymentScheduleSchema = new Schema(
  {
    loanApplicationId: {
      type: Types.ObjectId,
      ref: "LoanApplication",
      required: true,
      index: true,
    },

    scheduleNumber: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    principalAmount: {
      type: Number,
      required: true,
    },

    outstandingPrincipal: {
      type: Number,
      required: true,
    },

    interestAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "OVERDUE"],
      default: "PENDING",
    },

    paidAt: Date,
  },
  { timestamps: true }
);

export const RepaymentSchedule = model<IRepaymentSchedule>(
  "RepaymentSchedule",
  RepaymentScheduleSchema
);
