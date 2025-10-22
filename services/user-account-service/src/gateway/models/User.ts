import { Schema, model } from "mongoose";
import { IUser } from "../../domain/entities/IUser";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    isActive: { type: Boolean, required: true,default:false },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
