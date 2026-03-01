import { IMapper } from "@figur-ledger/shared";


import container from ".";
import { DI_TOKENS } from "./types";
import { TransactionPersistenceMapper } from "../mapper/TransactionPersistenceMapper";
import { ITransactionPersistenceMapper } from "../mapper/interfaces/ITransactionPersistenceMapper";


container.bind<ITransactionPersistenceMapper>(DI_TOKENS.MAPPERS.TRANSACTION_PERSISTENCE_MAPPER).to(TransactionPersistenceMapper);