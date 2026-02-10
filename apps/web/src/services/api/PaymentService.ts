import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import {
  billRoutes,
  paymentRoutes,
} from "@/constant/api/routes/paymentAndBIllingRoutes";
import { ApiResponse } from "@/types/api/api";
import { IPayment } from "@/types/IPayment";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const PaymentService = {
  async getBillDetails(category: string): Promise<ApiResponse<any[]>> {
    try {
      return await request<ApiResponse<any[]>>(
        httpMethods.GET,
        billRoutes.GET(category),
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch bill details");
    }
  },

  async initiateBillPayment(
    paymentPayload: {
      paymentData:IPayment,
      billDetails:any
    },
  ): Promise<ApiResponse<IPayment>> {
    try {
      return await request<ApiResponse<IPayment>>(
        httpMethods.POST,
        paymentRoutes.PAYMENTS,
        paymentPayload,
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to initiate bill payment");
    }
  },

  async getPaymentHistory(userId: string): Promise<ApiResponse<IPayment[]>> {
  try {
      return await request<ApiResponse<IPayment[]>>(
        httpMethods.GET,
        paymentRoutes.GET_HISTORY(userId),
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetching payment history");
    }
  },
};
