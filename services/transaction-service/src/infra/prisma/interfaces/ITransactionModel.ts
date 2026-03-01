import { Prisma, TransactionStatus, TransactionType } from '@prisma/client';

export interface ITransaction {
  id: string;

  referenceId: string;
  idempotencyKey: string;

  senderAccountId: string|null;
  receiverAccountId: string|null;

  amount: Prisma.Decimal;   // Financial-safe decimal
  currency: string;

  status: TransactionStatus; // "PENDING" | "SUCCESS" | "FAILED"
  type: TransactionType;     // "TRANSFER" | "DEPOSIT" | "WITHDRAW"

  senderBalanceAfter: Prisma.Decimal | null;
  receiverBalanceAfter: Prisma.Decimal | null;

  failureReason: string | null;
  // metadata: Prisma.JsonValue | null;

  createdAt: Date;
  updatedAt: Date;
}
