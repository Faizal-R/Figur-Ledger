import { buildParams } from "@/utils/buildParams";

export const ReportsRoutes = {
  GET_GENERATED_ACCOUNT_STATEMENT: ({
    accountId,
    type,
    value,
    customRange,
    page,
  }: {
    accountId: string;
    type: string;
    value: string;
    customRange: { startDate: string; endDate: string };
    page: number;
  }) =>
    `/reports/accounts/${accountId}/statement?${buildParams({ type, value, page, ...customRange })}`,
 
};


export const AnalyticsRoutes = {
  GET_ANALYTICS: "/analytics",
};



