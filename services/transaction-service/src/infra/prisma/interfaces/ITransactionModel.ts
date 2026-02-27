import { Prisma, TransactionStatus, TransactionType } from '@prisma/client';

export interface ITransaction {
  id: string;

  referenceId: string;
  idempotencyKey: string;

  senderAccountId: string;
  receiverAccountId: string;

  amount: number;   // Financial-safe decimal
  currency: string;

  status: TransactionStatus; // "PENDING" | "SUCCESS" | "FAILED"
  type: TransactionType;     // "TRANSFER" | "DEPOSIT" | "WITHDRAW"

  senderBalanceAfter: number;
  receiverBalanceAfter: number;

  failureReason: string | null;
  metadata: Prisma.JsonValue | null;

  createdAt: Date;
  updatedAt: Date;
}
