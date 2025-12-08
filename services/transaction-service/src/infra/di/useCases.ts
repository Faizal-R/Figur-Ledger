import container from ".";

import { DI_TOKENS } from "./types";
import { TransactionUseCase } from "../../use-cases/useCases/TransactionUseCase";

import { ITransactionUseCase } from "../../use-cases/useCases/interfaces/ITransactionUseCase";



import { ITransferUseCase } from "../../use-cases/useCases/interfaces/ITransferUseCase";
import { TransferUseCase } from "../../use-cases/useCases/TransferUserCase";

container.bind<ITransactionUseCase>(DI_TOKENS.USE_CASES.TRANSACTION_USE_CASES).to(TransactionUseCase);

container.bind<ITransferUseCase>(DI_TOKENS.USE_CASES.TRANSFER_USE_CASE).to(TransferUseCase)
