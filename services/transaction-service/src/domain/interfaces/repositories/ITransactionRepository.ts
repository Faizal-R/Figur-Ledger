import { Transaction } from "../../entities/Transaction";

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>;

  findById(id: string): Promise<Transaction | null>;

  findByAccountId(userId: string): Promise<Transaction[]>;
  findByIdempotencyKey(idempotencyKey: string): Promise<Transaction | null>;

  updateById(
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction | null>;

  deleteById(id: string): Promise<boolean>;
}
