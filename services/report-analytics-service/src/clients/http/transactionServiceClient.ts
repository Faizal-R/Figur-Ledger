import { AxiosInstance } from "axios";
import { createApiInstance } from "../api";
import { ITransactionServiceClient } from "./interfaces/ITransactionServiceClient";

export class TransactionServiceClient implements ITransactionServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL:
        process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004/api/v1",
    });
  }

  async getTransactions(accountId: string,startDate:string,endDate:string){
    try {
      const res = await this.apiClient?.get(`/transactions/history/${accountId}`,{
        params:{
          startDate,
          endDate,
          sortBy:"DATE_ASC",
        }
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}
