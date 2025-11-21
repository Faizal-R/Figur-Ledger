import { IBaseRepository } from "@figur-ledger/shared";
import { Transaction } from "../../entities/Transaction";

export interface ITransactionRepository extends IBaseRepository<Transaction> {
}