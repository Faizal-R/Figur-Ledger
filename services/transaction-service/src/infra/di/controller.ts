import container from ".";

import { ITransactionController } from "../../interfaces/controllers/interfaces/ITransactionController";
import { TransactionController } from "../../interfaces/controllers/TransactionController";
import { DI_TOKENS } from "./types";


container.bind<ITransactionController>(DI_TOKENS.CONTROLLER.TRANSACTION_CONTROLLER).to(TransactionController);