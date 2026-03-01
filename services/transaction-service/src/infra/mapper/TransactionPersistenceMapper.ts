// src/infrastructure/mappers/TransactionPersistenceMapper.ts
import { Prisma, Transaction as PrismaTransaction } from "@prisma/client";
import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionPersistenceMapper } from "./interfaces/ITransactionPersistenceMapper";

export class TransactionPersistenceMapper implements ITransactionPersistenceMapper {
  // DB → Domain
  toDomain(raw: PrismaTransaction): Transaction {
    if (!raw) throw new Error("Cannot map null/undefined transaction record");

    return new Transaction(
      raw.id,
      raw.referenceId,
      raw.idempotencyKey,

      raw.senderAccountId,
      raw.receiverAccountId,

      Number(raw.amount),
      raw.currency,

      raw.status,
      raw.type,
      raw.senderBalanceAfter ? Number(raw.senderBalanceAfter) : null,
      raw.receiverBalanceAfter ? Number(raw.receiverBalanceAfter) : null,
      raw.failureReason ?? null,

      raw.createdAt,
      raw.updatedAt,
    );
  }

  toPersistence(dto: Transaction): Prisma.TransactionCreateInput {
    return {
      id: dto.id,
      referenceId: dto.referenceId,
      idempotencyKey: dto.idempotencyKey,

      senderAccountId: dto.senderAccountId ?? null,
      receiverAccountId: dto.receiverAccountId ?? null,

      amount: new Prisma.Decimal(dto.amount),
      currency: dto.currency,
      type: dto.type,
      status: "PENDING",

      failureReason: dto.failureReason ?? null,
      senderBalanceAfter: dto.senderBalanceAfter ?? null,
      receiverBalanceAfter: dto.receiverBalanceAfter ?? null,
    };
  }

 toUpdatePersistence(
  partial: Partial<Transaction>,
): Prisma.TransactionUpdateInput {
  return {
    senderAccountId: partial.senderAccountId,
    receiverAccountId: partial.receiverAccountId,

    amount:
      partial.amount !== undefined
        ? new Prisma.Decimal(partial.amount )
        : undefined,

    senderBalanceAfter:
      partial.senderBalanceAfter !== undefined
        ? partial.senderBalanceAfter === null
          ? null
          : new Prisma.Decimal(partial.senderBalanceAfter)
        : undefined,

    receiverBalanceAfter:
      partial.receiverBalanceAfter !== undefined
        ? partial.receiverBalanceAfter === null
          ? null
          : new Prisma.Decimal(partial.receiverBalanceAfter)
        : undefined,

    currency: partial.currency,
    status: partial.status,
    type: partial.type,
    failureReason: partial.failureReason,
  };
}
}
