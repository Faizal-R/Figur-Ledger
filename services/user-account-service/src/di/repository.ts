import container from ".";

import { DI_TOKENS } from "./types";

import { UserRepository } from "../gateway/repositories/UserRepository";

container.bind(DI_TOKENS.REPOSITORIES.USER_REPOSITORY).to(UserRepository).inSingletonScope();

container.bind(DI_TOKENS.REPOSITORIES.ACCOUNT_REPOSITORY).to(UserRepository).inSingletonScope();