import { Document, Types } from "mongoose";
import { AccountType } from "../../../domain/entities/Account";

export interface IAccountDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  nickname:string;
  accountNumber: string;
  type:AccountType;
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  ifsc:string;
  interestRate?:number;
  minBalance?:number;
  
  createdAt: Date;
  updatedAt: Date;
}
