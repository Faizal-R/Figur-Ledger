import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { ReportsRoutes } from "@/constant/api/routes/ReportsAndAnalyticsRoutes";

export const ReportService = {
  async getGeneratedAccountStatement(params: {
    accountId: string;
    type: "duration" | "fy"|"custom";
    value: string;
    customRange: { startDate: string; endDate: string };
  }) {
    return request(
      httpMethods.GET,
      ReportsRoutes.GET_GENERATED_ACCOUNT_STATEMENT(params),
    );
  }
}
