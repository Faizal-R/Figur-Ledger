export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";
export interface Transaction {
  id: string;
  referenceId: string;
  senderAccountId: string | null;
  receiverAccountId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string;
}