import container from ".";

import { DI_TOKENS } from "./types";

import { UserRepository } from "../gateway/repositories/UserRepository";
import { AccountRepository } from "../gateway/repositories/AccountRepository";

container.bind(DI_TOKENS.REPOSITORIES.USER_REPOSITORY).to(UserRepository).inSingletonScope();

container.bind(DI_TOKENS.REPOSITORIES.ACCOUNT_REPOSITORY).to(AccountRepository).inSingletonScope();