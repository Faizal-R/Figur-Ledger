import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { TransactionRoutes } from "@/constant/api/routes/transactionRoutes";
import { ApiResponse } from "@/types/api/api";
import { Transaction } from "@/types/ITransaction";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { HttpStatusCode } from "axios";

export const TransactionService = {
  async processDeposit(
    accountId: string,
    amount: number,
   referenceId:string
  ): Promise<ApiResponse<{balance:number,txId:string }>> {
    try {
      return await request<ApiResponse<{balance:number,txId:string }>>(
        httpMethods.POST,
        TransactionRoutes.PROCESS_DEPOSIT,
        { amount, accountId,referenceId }
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to process deposit");
    }
  },

  async processWithdrawal(
    accountId: string,
    referenceId:string,
    amount: number): Promise<ApiResponse<{balance:number,txId:string }>> {
    try {
      return await request<ApiResponse<{balance:number,txId:string }>>(
        httpMethods.POST,
        TransactionRoutes.PROCESS_WITHDRAWAL,
        { amount, accountId,referenceId }
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to process withdrawal");
    }

  },

  async getTransactionHistory(accountId:string): Promise<ApiResponse< Transaction[]>> {
    try {
      return await request<ApiResponse< Transaction[]>>(
        httpMethods.GET,
        `${TransactionRoutes.TRANSACTION_HISTORY}/${accountId}`
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to fetch transaction history");
    }
  }
,
  async TransferAmount(
  senderAccountId: string,
  receiverAccountId: string,
  amount: number,
  
): Promise<ApiResponse<{ success: true; txId: string }>> {
  try {
    return await request<ApiResponse<{ success: true; txId: string }>>(
      httpMethods.POST,
      TransactionRoutes.TRANSFER,
      {
        senderAccountId,
        receiverAccountId,
        amount,
      }
    );
  } catch (error) {
    throw parseAxiosError(error, "Failed to process transfer");
  }
}
};
