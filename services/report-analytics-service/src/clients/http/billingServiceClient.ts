import { AxiosInstance } from "axios";
import { createApiInstance } from "../api";
import { IBillingServiceClient } from "./interfaces/IBillingServiceClient";

export class BillingServiceClient implements IBillingServiceClient {
  private apiClient: AxiosInstance | null = null;
  constructor() {
    this.apiClient = createApiInstance({
      baseURL:
        process.env.BILLING_SERVICE_URL || "http://localhost:5005/api/v1",
    });
  }

  async getBillerStats() {
    try {
      const res = await this.apiClient?.get(`/payments/billers/analytics/stats`);
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
}
