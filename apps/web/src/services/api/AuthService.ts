import request from "@/config/client";
import { createApiService } from "@/services/api/ApiService";
import { ApiResponse } from "@/types/api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth";

interface AuthServiceCustomMethods {
  login: (data: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
  register: (data: RegisterRequest) => Promise<ApiResponse<RegisterResponse>>;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
  verifyOtp: (data: VerifyOtpRequest) => Promise<VerifyOtpResponse>;
}

export const AuthService = createApiService<unknown, AuthServiceCustomMethods>(
  "auth",
  {
    login: (data) => request<ApiResponse<LoginResponse>>("post", "/auth/login", data),
    register: (data) =>
      request<ApiResponse<RegisterResponse>>("post", "/auth/register", data),
    // logout: () => request<{ success: boolean; message: string }>("post", "/auth/logout"),
    forgotPassword: (data) =>
      request<ForgotPasswordResponse>("post", "/auth/forgot-password", data),
    resetPassword: (data) =>
      request<ResetPasswordResponse>("post", "/auth/reset-password", data),
    verifyOtp: (data) =>
      request<VerifyOtpResponse>("post", "/auth/verify-otp", data),
  }
);
