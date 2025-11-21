import { IMapper } from "@figur-ledger/shared";


import container from ".";
import { DI_TOKENS } from "./types";
import { TransactionPersistenceMapper } from "../infra/mapper/TransactionPersistenceMapper";


container.bind(DI_TOKENS.MAPPERS.TRANSACTION_PERSISTENCE_MAPPER).to(TransactionPersistenceMapper);