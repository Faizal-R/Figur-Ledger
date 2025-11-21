
import { DI_TOKENS } from "./types";
import { TransactionUseCase } from "../use-cases/useCases/TransactionUseCase";

import { ITransactionUseCase } from "../use-cases/useCases/interfaces/ITransactionUseCase";
import container from ".";


container.bind<ITransactionUseCase>(DI_TOKENS.USE_CASES.TRANSACTION_USE_CASES).to(TransactionUseCase);