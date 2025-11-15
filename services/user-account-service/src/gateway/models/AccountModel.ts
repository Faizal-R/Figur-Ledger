import { model, Schema, Types } from "mongoose";
import { IAccountDocument } from "./interfaces/IAccountModel";

const AccountSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    interestRate: {
      type: Number,
      default: 0,
    },
    minBalance: {
      type: Number,
      default: 0,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["savings", "checking", "business"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["active", "frozen", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = model<IAccountDocument>("Account", AccountSchema);

export default AccountModel;
