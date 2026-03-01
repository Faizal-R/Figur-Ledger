import { AxiosInstance } from "axios";
import { createApiInstance } from "../api";
import { IAccountServiceClient } from "./interfaces/IAccountServiceClient";

export class AccountServiceClient implements IAccountServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL:
        process.env.ACCOUNT_SERVICE_URL || "http://localhost:5002/api/v1",
    });
  }

  async getAccountDetailsById(accountId: string) {
    try {
      const res = await this.apiClient?.get(`/accounts/${accountId}`);
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}
