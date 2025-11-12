import { Document, Types } from "mongoose";

export interface IAccountDocument extends Document {
  userId: Types.ObjectId;
  accountNumber: string;
  type: 'savings' | 'checking' | 'business';
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}
