import { ITransactionFilters } from "../../../types/ITransactionFilters";
import { Transaction } from "../../entities/Transaction";

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>;

  findById(id: string): Promise<Transaction | null>;

  findByAccountId(
    accountId: string,
    page: number,
    filters?: ITransactionFilters,
  ): Promise<{ transactions: Transaction[]; totalPages: number }>;
  findByIdempotencyKey(idempotencyKey: string): Promise<Transaction | null>;

  updateById(
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction | null>;

  deleteById(id: string): Promise<boolean>;
}
