import container from ".";
import { DI_TOKENS } from "./types";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";

container
  .bind<ITransactionRepository>(DI_TOKENS.REPOSITORIES.TRANSACTION_REPOSITORY)
  .to(TransactionRepository).inSingletonScope();