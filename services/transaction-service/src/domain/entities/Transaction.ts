export type TTransactionStatus =
  | "PENDING"          // created
  | "DEBIT_SUCCESS"    // sender debited
  | "CREDIT_SUCCESS"   // receiver credited
  | "SUCCESS"          // finalized
  | "ROLLED_BACK"      // refunded
  | "FAILED"           // technical failure
  | "MANUAL_REVIEW";   // refund failed

export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly referenceId: string,
    public readonly idempotencyKey: string,

    public readonly senderAccountId: string | null,
    public readonly receiverAccountId: string | null,

    public readonly amount: number ,
    public readonly currency: string,

    public status: TTransactionStatus,
    public readonly type: TransactionType,

    public failureReason: string | null,

    public readonly createdAt: Date,
    public updatedAt: Date
  ) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    if (!referenceId || !idempotencyKey) {
      throw new Error("referenceId and idempotencyKey are mandatory");
    }
  }
}
