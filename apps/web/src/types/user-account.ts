
import { Roles } from "@/types/role";
type DateString= Date | string

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IUser {
  id?: string;
  email: string;
  avatarKey: string | null;
  phone: string;
  role: Roles;
  personalInfo: PersonalInfo;
  address: AddressInfo;
  accountId?: string;

  createdAt?: DateString;
}

export type AccountType =
  | "savings"
  | "checking"
  | "business"
  | "salary"
  | "current";
export type AccountStatus = "active" | "frozen" | "closed";

export interface IAccount {
  id: string;
  userId: string;
  accountNumber?: string;
  type: AccountType;
  balance: number;
  currency: string;
  nickname?: string;
  ifsc?: string;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountFormData {
  type: AccountType | "";
  nickname: string;
  currency: string;
  termsAccepted: boolean;
  detailsConfirmed: boolean;
}

export interface KYCData {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  isComplete: boolean;
}
