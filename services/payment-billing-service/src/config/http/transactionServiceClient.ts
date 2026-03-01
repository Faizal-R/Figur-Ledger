import { AxiosInstance } from "axios";
import { createApiInstance } from "./api";
import { ITransactionServiceClient } from "./interfaces/ITransactionServiceClient";

export class TransactionServiceClient implements ITransactionServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL:
        process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004/api/v1",
    });
  }

  async transfer(senderAccountId: string, receiverAccountId: string, amount: number): Promise<{
    data:{
        id:string
    }
  }> {
    try {
      const res = await this.apiClient?.post("/transactions/transfer", {
        senderAccountId,
        receiverAccountId,
        amount,
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}