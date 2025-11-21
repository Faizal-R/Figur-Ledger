import { injectable, inject } from "inversify";
import { BaseRepository, IMapper } from "@figur-ledger/shared";
import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { TransactionModel } from "../model/TransactionModel";
import { ITransactionDocument } from "../model/interfaces/ITransactionModel";
import { DI_TOKENS } from "../../di/types";

@injectable()
export class TransactionRepository
  extends BaseRepository<Transaction, ITransactionDocument>
  implements ITransactionRepository
{
  constructor(
    @inject(DI_TOKENS.MAPPERS.TRANSACTION_PERSISTENCE_MAPPER)
    mapper: IMapper<Transaction, ITransactionDocument>
  ) {
    super(TransactionModel, mapper);
  }
}
