import request from "@/config/client";
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
  VerifyOtpResponse
} from "@/types/auth";

import { parseAxiosError } from "@/utils/parseAxiosError";

export const AuthService = {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      return await request<ApiResponse<LoginResponse>>(
        "post",
        "/auth/login",
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while logging in");
    }
  },

  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      return await request<ApiResponse<RegisterResponse>>(
        "post",
        "/auth/register",
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while registering");
    }
  },

  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    try {
      return await request<ForgotPasswordResponse>(
        "post",
        "/auth/forgot-password",
        data
      );
    } catch (error) {
      throw parseAxiosError(
        error,
        "An error occurred while requesting password reset"
      );
    }
  },

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    try {
      return await request<ResetPasswordResponse>(
        "post",
        "/auth/reset-password",
        data
      );
    } catch (error) {
      throw parseAxiosError(
        error,
        "An error occurred while resetting the password"
      );
    }
  },

  async verifyOtp(
    data: VerifyOtpRequest
  ): Promise<ApiResponse<VerifyOtpResponse>> {
    try {
      return await request<ApiResponse<VerifyOtpResponse>>(
        "post",
        "/auth/verify-otp",
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while verifying OTP");
    }
  },

  async logout():Promise<void>{
    try {
      return await request("post","/auth/logout")
    } catch (error) {
      throw parseAxiosError(error,"An Error occured while logOut")
    }
  }
};
