import container from ".";
import { DI_TOKENS } from "./types";



import { UserPersistenceMapper } from "../infrastructure/persistence/mappers/UserPersistenceMapper";
import { IMapper } from "@figur-ledger/shared";



container.bind(DI_TOKENS.MAPPERS.USER_PERSISTENCE_MAPPER).to(UserPersistenceMapper);