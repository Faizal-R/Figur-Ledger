import { ITransactionFilters } from "@/components/features/customer/transactions/TransactionCard";
import { buildParams } from "@/utils/buildParams";

export const TransactionRoutes = {
  PROCESS_DEPOSIT: "/transactions/deposit",
  PROCESS_WITHDRAWAL: "/transactions/withdraw",
  TRANSACTION_HISTORY: (accountId: string, page: number,filters:ITransactionFilters) =>
    `/transactions/history/${accountId}?page=${page}&&${buildParams(filters)}`,
  TRANSFER: "/transactions/transfer",
};
