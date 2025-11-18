import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { AuthRoutes } from "@/constant/api/routes/authRoutes";
import { ApiResponse } from "@/types/api";
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types/api/request/IAuthRequest";
import {
  RegisterResponse,
  ForgotPasswordResponse,
  LoginResponse,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/api/response/IAuthResponses";

import { parseAxiosError } from "@/utils/parseAxiosError";

export const AuthService = {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      return await request<ApiResponse<LoginResponse>>(
        httpMethods.POST,
        AuthRoutes.LOGIN,
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while logging in");
    }
  },

  async register(
    data: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse>> {
    try {
      return await request<ApiResponse<RegisterResponse>>(
        httpMethods.POST,
        AuthRoutes.REGISTER,
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
        httpMethods.POST,
        AuthRoutes.FORGOT_PASSWORD,
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
        httpMethods.POST,
        AuthRoutes.RESET_PASSWORD,
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
        httpMethods.POST,
        AuthRoutes.VERIFY_OTP,
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while verifying OTP");
    }
  },

  async logout(): Promise<void> {
    try {
      return await request(httpMethods.POST, AuthRoutes.LOGOUT);
    } catch (error) {
      throw parseAxiosError(error, "An Error occured while logOut");
    }
  },
};
