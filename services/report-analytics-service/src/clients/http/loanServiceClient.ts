import { AxiosInstance } from "axios";
import { createApiInstance } from "../api";
import { ILoanServiceClient } from "./interfaces/ILoanServiceClient";

export class LoanServiceClient implements ILoanServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL:
        process.env.LOAN_SERVICE_URL || "http://localhost:5003/api/v1",
    });
  }

  async getLoanStats() {
    try {
      const res = await this.apiClient?.get(`/loan/applications/analytics/stats`);
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}
