// src/infrastructure/repositories/TransactionRepository.ts

import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { inject, injectable } from "inversify";
import { ITransactionPersistenceMapper } from "../mapper/interfaces/ITransactionPersistenceMapper";
import { DI_TOKENS } from "../di/types";
import { prisma } from "../prisma/PrismaClient";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import { LIMITS } from "../config/limit";
import { ITransactionFilters } from "../../types/ITransactionFilters";
import { buildQuery } from "../utils/buildQuery";


@injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @inject(DI_TOKENS.MAPPERS.TRANSACTION_PERSISTENCE_MAPPER)
    private readonly mapper: ITransactionPersistenceMapper,
  ) {}

  async create(data: Transaction): Promise<Transaction> {
    const record = await prisma.transaction.create({
      data: this.mapper.toPersistence(data),
    });

    return this.mapper.toDomain(record);
  }

  async findById(id: string): Promise<Transaction | null> {
    const record = await prisma.transaction.findUnique({
      where: { id },
    });

    return record ? this.mapper.toDomain(record) : null;
  }

  async findByAccountId(
    accountId: string,
    page: number = 1,
    filters: ITransactionFilters,
  ): Promise<{ transactions: Transaction[]; totalPages: number }> {
    const skip = (page - 1) * LIMITS.default;

    const { where, orderBy } = buildQuery(accountId, filters);
    const records = await prisma.transaction.findMany({
      where,
      orderBy,
      skip,
      take: LIMITS.default,
    });

    const totalCount = await prisma.transaction.count({
      where,
    });

    return {
      transactions: records.map(r => this.mapper.toDomain(r)),
      totalPages: Math.ceil(totalCount / LIMITS.default),
    };
  }

  async updateById(
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction | null> {
    const record = await prisma.transaction.update({
      where: { id },
      data: this.mapper.toUpdatePersistence(data),
    });

    return this.mapper.toDomain(record);
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      await prisma.transaction.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
  async findByIdempotencyKey(
    idempotencyKey: string,
  ): Promise<Transaction | null> {
    try {
      const record = await prisma.transaction.findUnique({
        where: { idempotencyKey },
      });
      return record ? this.mapper.toDomain(record) : null;
    } catch (error) {
      console.log("Error in findByIdempotencyKey:", error);
      throw new CustomError(
        "Error finding transaction by idempotencyKey",
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
