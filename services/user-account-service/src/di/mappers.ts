import container from ".";
import { DI_TOKENS } from "./types";



import { UserPersistenceMapper } from "../gateway/mappers/UserPersistenceMapper";
import { AccountPersistenceMapper } from "../gateway/mappers/AccountPersistenceMapper";


container.bind(DI_TOKENS.MAPPERS.USER_PERSISTENCE_MAPPER).to(UserPersistenceMapper);
container.bind(DI_TOKENS.MAPPERS.ACCOUNT_PERSISTENCE_MAPPER).to(AccountPersistenceMapper)