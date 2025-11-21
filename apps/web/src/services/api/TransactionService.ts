import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { TransactionRoutes } from "@/constant/api/routes/transactionRoutes";
import { ApiResponse } from "@/types/api";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const TransactionService = {
  async processDeposit(
    accountId: string,
    amount: number
  ): Promise<ApiResponse<{ orderId: string,amount:number,txId:string }>> {
    try {
      return await request<ApiResponse<{ orderId: string,amount:number,txId:string }>>(
        httpMethods.POST,
        TransactionRoutes.PROCESS_DEPOSIT,
        { amount, accountId }
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to process deposit");
    }
  },

    async verifyPayment(orderId: string, paymentId: string, signature: string,txId:string): Promise<ApiResponse<{ updatedAmount:number }>> {
    try {
      return await request<ApiResponse<{ updatedAmount:number }>>(
        httpMethods.POST,
        TransactionRoutes.VERIFY_PAYMENT,
        { orderId, paymentId, signature,txId }
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to verify payment");
    }   
}
};
