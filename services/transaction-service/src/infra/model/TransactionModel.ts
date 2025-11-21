import { Schema, model } from "mongoose";
import { ITransactionDocument } from "./interfaces/ITransactionModel";

const TransactionSchema = new Schema<ITransactionDocument>(
  {
    referenceId: {
      type: String,
      required: true,
      index: true,
    },

    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    senderAccountId: {
      type: String,
      default: null,
    },

    receiverAccountId: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be greater than 0"],
    },

    currency: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      required: true,
      default: "PENDING",
    },

    type: {
      type: String,
      enum: ["TRANSFER", "DEPOSIT", "WITHDRAWAL", "REVERSAL"],
      required: true,
    },

    failureReason: {
      type: String,
      default: null,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TransactionModel = model<ITransactionDocument>(
  "Transaction",
  TransactionSchema
);
