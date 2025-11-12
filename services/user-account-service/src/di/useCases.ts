import container from ".";
import { DI_TOKENS } from "./types";

import { AuthUseCase } from "../interator/useCases/implements/AuthUseCase";
import { UserUseCase } from "../interator/useCases/implements/UserUseCase";
import { AccountUseCase } from "../interator/useCases/implements/AccountUseCase";

container.bind(DI_TOKENS.USECASES.AUTH_USECASE).to(AuthUseCase).inSingletonScope();
container.bind(DI_TOKENS.USECASES.USER_USECASE).to(UserUseCase).inSingletonScope();
container.bind(DI_TOKENS.USECASES.ACCOUNT_USECASE).to(AccountUseCase).inSingletonScope();