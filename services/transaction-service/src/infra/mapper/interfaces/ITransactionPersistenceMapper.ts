import { Prisma, Transaction as PrismaTransaction } from "@prisma/client";
import { Transaction } from "../../../domain/entities/Transaction";

export interface ITransactionPersistenceMapper {
  // DB → Domain
  toDomain(raw: PrismaTransaction): Transaction;

  // Domain → DB (Create)
  toPersistence(dto: Transaction): Prisma.TransactionCreateInput;

  // Domain → DB (Update)
  toUpdatePersistence(
    partial: Partial<Transaction>
  ): Prisma.TransactionUpdateInput;
}
