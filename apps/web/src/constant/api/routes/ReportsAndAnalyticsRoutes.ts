import { buildParams } from "@/utils/buildParams";

export const ReportsRoutes = {
  GET_GENERATED_ACCOUNT_STATEMENT: ({
    accountId,
    type,
    value,
    customRange,
  }: {
    accountId: string;
    type: string;
    value: string;
    customRange: { startDate: string; endDate: string };
  }) =>
    `/reports/accounts/${accountId}/statement?${buildParams({ type, value, ...customRange })}`,
};
