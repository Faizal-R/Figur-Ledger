import mongoose, { Document, ObjectId, Types } from "mongoose";

export enum BILLER_CATEGORIES {
  ELECTRICITY = "ELECTRICITY",
  WATER = "WATER",
  INTERNET = "INTERNET",
  MOBILE = "MOBILE",
  CABLE = "CABLE",
  GAS = "GAS",
  OTHERS = "OTHERS",
}

type TBillerCategory = keyof typeof BILLER_CATEGORIES;

export interface IBiller extends Document {

  billerId: string;
  name: string;
  category: TBillerCategory;
  collectionAccountId: string;
  validationPattern: string;
  fixedAmounts: number[];
  isActive: boolean;
  contact?:{
    email?: string;
    phone?: string;
  }
}

 const BillerSchema = new mongoose.Schema<IBiller>(
  {
    billerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: BILLER_CATEGORIES,
      required: true,
    },
    contact:{
      email: { type: String },
      phone: { type: String },
    },

    collectionAccountId: { type: String, required: true },
    validationPattern: { type: String },
    fixedAmounts: { type: [Number] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);


export const Biller = mongoose.model<IBiller>("Biller", BillerSchema);
