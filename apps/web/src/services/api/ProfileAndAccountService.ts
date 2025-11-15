import request from "@/config/client";
import { ApiResponse } from "@/types/api";
import { IUser } from "@/types/user-account";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const UserService = {
  async getById(id: string): Promise<ApiResponse<IUser>> {
    try {
      return await request<ApiResponse<IUser>>("get", `/users/${id}`);
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch user");
    }
  },

  async update(id: string, data: Partial<IUser>): Promise<ApiResponse<IUser>> {
    try {
      return await request<ApiResponse<IUser>>(
        "patch",
        `/users/${id}`,
        data
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to update user");
    }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      return await request<ApiResponse<null>>("delete", `/users/${id}`);
    } catch (error) {
      throw parseAxiosError(error, "Failed to delete user");
    }
  }
};





import { IAccount } from "@/types/user-account";


export const AccountService = {
  async getAccountsByUserId(
    userId: string
  ): Promise<ApiResponse<IAccount[]>> {
    try {
      return await request<ApiResponse<IAccount[]>>(
        "get",
        `/users/accounts?userId=${userId}`
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
        "post",
        "/accounts/create",
        account
      );
    } catch (error) {
      throw parseAxiosError(error, "An error occurred while creating account");
    }
  }
};
