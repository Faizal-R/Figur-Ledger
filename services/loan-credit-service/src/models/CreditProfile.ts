
import { Schema, model, Types,Document } from "mongoose";



export interface ICreditProfile extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  creditScore: number; 

  creditStatus: "ELIGIBLE" | "BLOCKED";

  riskBand: "LOW" | "MEDIUM" | "HIGH";

  createdAt: Date;
  updatedAt: Date;
}


const CreditProfileSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    creditScore: {
      type: Number,
      required: true,
      default: 500,
      min: 300,
      max: 900,
    },

    creditStatus: {
      type: String,
      enum: ["ELIGIBLE", "BLOCKED"],
      default: "ELIGIBLE",
    },

    riskBand: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
  },
  { timestamps: true }
);

export const CreditProfile = model<ICreditProfile>("CreditProfile", CreditProfileSchema);

