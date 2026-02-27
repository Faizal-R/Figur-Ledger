import { TTransactionStatus } from "../domain/entities/Transaction";

type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";
type SortBy = "DATE_DESC" | "DATE_ASC" | "AMOUNT_DESC" | "AMOUNT_ASC";

export interface ITransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: "ALL" | TransactionType;
  minAmount?: string;
  maxAmount?: string;
  status?: "ALL" | TTransactionStatus;
  sortBy?: SortBy;
}
