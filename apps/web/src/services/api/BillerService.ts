import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { billerRoutes } from "@/constant/api/routes/paymentAndBIllingRoutes";
import { ApiResponse } from "@/types/api/api";
import { IBiller, ISavedBiller } from "@/types/IBill";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const BillerService = {
  async createBiller(data: {
    name: string;
    category: string;
    contactEmail: string;
    contactPhone: string;
  }): Promise<ApiResponse<IBiller>> {
    try {
      console.log("data:service", data);
      return await request<ApiResponse<IBiller>>(
        httpMethods.POST,
        billerRoutes.CREATE,
        data,
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to create biller");
    }
  },
  async getBillers(category: string): Promise<ApiResponse<IBiller[]>> {
    try {
      return await request<ApiResponse<IBiller[]>>(
        httpMethods.GET,
        billerRoutes.GET_ALL(category),
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch billers");
    }
  },
  async saveBiller(data:Partial<ISavedBiller>): Promise<ApiResponse<any>> {
    try {
      return await request<ApiResponse<any>>(
        httpMethods.POST,
        billerRoutes.SAVE,
        data,
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to save biller");
    }
  },
  async getSavedBillers(userId: string, category: string): Promise<ApiResponse<ISavedBiller[]>> {
    try {
      return await request<ApiResponse<ISavedBiller[]>>(
        httpMethods.GET,
        billerRoutes.GET_ALL_SAVED(userId, category),
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch saved billers");
    }
  },
};