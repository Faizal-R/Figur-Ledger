import { IUser } from "./user-account";
import { DateString, Roles } from "@figur-ledger/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}

export interface RegisterRequest  {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: Roles;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: DateString;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface RegisterResponse {
 email:string;
 name:string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
 user:IUser;
 accessToken:string
 
}
