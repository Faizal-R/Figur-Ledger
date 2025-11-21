import container from ".";

import { DI_TOKENS } from "./types";
import { AccountServiceClient } from "../infra/http/accountServiceClient";
import { IAccountServiceClient } from "../domain/interfaces/http/IAccountServiceClient";

container
  .bind<IAccountServiceClient>(DI_TOKENS.HTTP.ACCOUNT_SERVICE_CLIENT)
  .to(AccountServiceClient)
  .inSingletonScope();