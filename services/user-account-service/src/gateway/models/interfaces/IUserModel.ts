import { Document, Types } from "mongoose";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;

  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };

  contact: {
    email: string;
    phone: string;
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
