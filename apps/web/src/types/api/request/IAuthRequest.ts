type DateString = string |  Date;
import {  Roles } from "@/types/role";

export interface LoginRequest {
  email: string;
  password: string;
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


export interface ForgotPasswordRequest {
  email: string;
}


export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

