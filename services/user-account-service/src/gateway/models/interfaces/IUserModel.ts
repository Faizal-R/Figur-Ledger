import { Document, Types } from "mongoose";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email:string;
  phone: string;
  avatarKey: string|null;
  authUserId:string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  createdAt: Date;
  updatedAt: Date;
}
