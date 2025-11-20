import request from "@/config/client";
import { ApiResponse } from "@/types/api";
import { IUser } from "@/types/user-account";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const UserService = {
  async getById(userId: string): Promise<ApiResponse<IUser>> {
    try {
      return await request<ApiResponse<IUser>>(httpMethods.GET, UserProfileRoutes.GET(userId));
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch user");
    }
  },

  async update(userId: string, data: Partial<IUser>): Promise<ApiResponse<IUser>> {
    try {
      return await request<ApiResponse<IUser>>(
        httpMethods.PUT,
        UserProfileRoutes.UPDATE(userId),
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to update user");
    }
  },

  async delete(userId: string): Promise<ApiResponse<null>> {
    try {
      return await request<ApiResponse<null>>(httpMethods.DELETE, UserProfileRoutes.DELETE(userId));
    } catch (error) {
      throw parseAxiosError(error, "Failed to delete user");
    }
  }
};





import { IAccount } from "@/types/user-account";
import { httpMethods } from "@/constant/api/enums/api";
import { AccountRoutes, UserProfileRoutes } from "@/constant/api/routes/userProfileAndAccountRoutes";


export const AccountService = {
  async getAccountsByUserId(
    userId: string
  ): Promise<ApiResponse<IAccount[]>> {
    try {
      return await request<ApiResponse<IAccount[]>>(
        httpMethods.GET,
        AccountRoutes.GET_ACCOUNTS_BY_USER_ID(userId)
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch user accounts");
    }
  },

  async createBankAccount(account: {
    currency: string;
    type: string;
    nickname: string;
    userId:string
  }): Promise<ApiResponse<IAccount>> {
    try {
      return await request<ApiResponse<IAccount>>(
        httpMethods.POST,
        AccountRoutes.CREATE,
        account
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while creating account");
    }
  }
};
