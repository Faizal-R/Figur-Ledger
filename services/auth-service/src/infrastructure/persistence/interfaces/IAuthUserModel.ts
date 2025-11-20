import  {Roles} from "@figur-ledger/shared";
import { Document, Types } from 'mongoose';
export interface AuthUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorAuth?: {
    enabled: boolean;
    method?: "sms" | "totp";
    totpSecret?: string;
    backupCodes?: string[];
  };
  loginAttempts?: number;
  lockUntil?: Date;
  lastLogin?: Date;
  lastLoginIp?: string;
  passwordChangedAt?: Date;
  role: Roles;
  status: "active" | "locked" | "suspended" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}