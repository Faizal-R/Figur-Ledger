import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { AnalyticsRoutes, ReportsRoutes } from "@/constant/api/routes/ReportsAndAnalyticsRoutes";
import { ApiResponse } from "@/types/api/api";

export const ReportService = {
  async getGeneratedAccountStatement(params: {
    accountId: string;
    type: "duration" | "fy" | "custom";
    value: string;
    customRange: { startDate: string; endDate: string };
    page: number;
  }): Promise<ApiResponse<unknown>> {
    return request<ApiResponse<unknown>>(
      httpMethods.GET,
      ReportsRoutes.GET_GENERATED_ACCOUNT_STATEMENT(params),
    );
  },
  async getAnalytics(type: "monthly" | "yearly" = "monthly"): Promise<ApiResponse<any>> {
    return request<ApiResponse<any>>(
      httpMethods.GET,
      `${AnalyticsRoutes.GET_ANALYTICS}?type=${type}`
    );
  },
};
