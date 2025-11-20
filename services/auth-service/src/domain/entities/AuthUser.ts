import { DateString } from "@figur-ledger/types";
import {Roles} from '@figur-ledger/shared'

export interface AuthUser {
  id: string;
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
  lockUntil?: DateString;
  lastLogin?: DateString;
  lastLoginIp?: string;
  passwordChangedAt?: DateString;

  role: Roles;
  status: "active" | "locked" | "suspended" | "closed";

  createdAt?: DateString;
  updatedAt?: DateString;
}
