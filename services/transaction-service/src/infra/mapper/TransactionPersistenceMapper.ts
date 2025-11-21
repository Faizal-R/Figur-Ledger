import { Types } from "mongoose";
import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionDocument } from "../model/interfaces/ITransactionModel";

export class TransactionPersistenceMapper {
   toDomain(raw: ITransactionDocument): Transaction {
    if (!raw) throw new Error("Cannot map null/undefined transaction record");

    return new Transaction(
      raw.id,
      raw.referenceId,
      raw.idempotencyKey,

      raw.senderAccountId ?? null,
      raw.receiverAccountId ?? null,

      raw.amount,
      raw.currency,

      raw.status,
      raw.type,

      raw.failureReason ?? null,
      raw.metadata ?? null,

      raw.createdAt,
      raw.updatedAt
    );
  }

   toPersistence(entity: Transaction): Partial<ITransactionDocument> {
    return {
      referenceId: entity.referenceId,
      idempotencyKey: entity.idempotencyKey,

      senderAccountId: entity.senderAccountId,
      receiverAccountId: entity.receiverAccountId,

      amount: entity.amount,
      currency: entity.currency,

      status: entity.status,
      type: entity.type,

      failureReason: entity.failureReason,
      metadata: entity.metadata,
    };
  }
}
