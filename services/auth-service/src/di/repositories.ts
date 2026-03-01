import container from ".";
import { DI_TOKENS } from "./types";


import { AuthUserRepository } from "../infrastructure/persistence/respositories/AuthRepository";
import { IAuthUserRepository } from "../domain/interfaces/reposiotries/IAuthUserRepository";



container
  .bind<IAuthUserRepository>(DI_TOKENS.REPOSITORIES.AUTH_USER_REPOSITORY)
  .to(AuthUserRepository).inSingletonScope();
