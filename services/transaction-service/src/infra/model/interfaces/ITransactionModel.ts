import { Document, Types } from "mongoose";

export interface ITransactionDocument extends Document {
  _id: Types.ObjectId;
  referenceId: string;
  idempotencyKey: string;

  senderAccountId: string | null;
  receiverAccountId: string | null;

  amount: number;
  currency: string;

  status: "PENDING" | "SUCCESS" | "FAILED";
  type: "TRANSFER" | "DEPOSIT" | "WITHDRAWAL" | "REVERSAL";

  failureReason: string | null;
  metadata: Record<string, any> | null;

  createdAt?: Date;
  updatedAt?: Date;
}
