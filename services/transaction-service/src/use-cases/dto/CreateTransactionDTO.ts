
import { TransactionType } from "../../domain/entities/Transaction";

export interface CreateTransactionDTO {
  referenceId: string;
  idempotencyKey: string;

  senderAccountId?: string | null;
  receiverAccountId?: string | null;

  amount: number;
  currency: string;

  type: TransactionType;

  failureReason?: string | null;
}
