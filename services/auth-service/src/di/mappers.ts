import container from ".";
import { DI_TOKENS } from "./types";



import { AuthUserPersistenceMapper } from "../infrastructure/persistence/mappers/AuthUserPersistenceMapper";
import { IMapper } from "@figur-ledger/shared";



container.bind(DI_TOKENS.MAPPERS.AUTH_USER_PERSISTENCE_MAPPER).to(AuthUserPersistenceMapper);