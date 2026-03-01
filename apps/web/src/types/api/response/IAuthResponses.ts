import { IUser } from "@/types/user-account";

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

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}
export interface ForgotPasswordResponse {
  message: string;
}
export interface RegisterResponse {
  email:string;
  name:string;
}