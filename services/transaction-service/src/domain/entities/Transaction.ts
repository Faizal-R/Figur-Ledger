import { DateString } from "@figur-ledger/types";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly referenceId: string,
    public readonly idempotencyKey: string,

    public readonly senderAccountId: string|null,
    public readonly receiverAccountId: string|null,

    public readonly amount: number,
    public readonly currency: string,

    public status: "PENDING" | "SUCCESS" | "FAILED",
    public readonly type: "TRANSFER" | "DEPOSIT" | "WITHDRAWAL" | "REVERSAL",

    public failureReason: string | null = null,
    public readonly metadata: Record<string, any> | null = null,

    public readonly createdAt?:DateString,
    public updatedAt?:DateString
  ) {
    if (amount <= 0) throw new Error("Amount must be greater than 0");
  }
}
