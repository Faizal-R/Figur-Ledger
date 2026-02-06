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

      raw.failureReason ?? null,

      raw.createdAt,
      raw.updatedAt
    );
  }


  toPersistence(dto:Transaction): Prisma.TransactionCreateInput {
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

      failureReason: dto.failureReason ?? null
      
    };
  }

 
  toUpdatePersistence(
    partial: Partial<Transaction>
  ): Prisma.TransactionUpdateInput {
    return {
      senderAccountId: partial.senderAccountId,
      receiverAccountId: partial.receiverAccountId,
      amount:
        partial.amount !== undefined
          ? new Prisma.Decimal(partial.amount)
          : undefined,
      currency: partial.currency,
      status: partial.status,
      type: partial.type,
      failureReason: partial.failureReason
      // updatedAt handled by Prisma @updatedAt
    };
  }
}
