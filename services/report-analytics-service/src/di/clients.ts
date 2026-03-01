import { DI_TOKENS } from "./types";
import container from "./index";

import { IAccountServiceClient } from "../clients/http/interfaces/IAccountServiceClient";
import { AccountServiceClient } from "../clients/http/accountServiceClient";

import { IUserServiceClient } from "../clients/http/interfaces/IUserServiceClient";
import { UserServiceClient } from "../clients/http/userServiceClient";

import { ITransactionServiceClient } from "../clients/http/interfaces/ITransactionServiceClient";
import { TransactionServiceClient } from "../clients/http/transactionServiceClient";

container
  .bind<IAccountServiceClient>(DI_TOKENS.CLIENTS.ACCOUNT_SERVICE_CLIENT)
  .to(AccountServiceClient)
  .inSingletonScope();
container
  .bind<IUserServiceClient>(DI_TOKENS.CLIENTS.USER_SERVICE_CLIENT)
  .to(UserServiceClient)
  .inSingletonScope();
container
  .bind<ITransactionServiceClient>(DI_TOKENS.CLIENTS.TRANSACTION_SERVICE_CLIENT)
  .to(TransactionServiceClient)
  .inSingletonScope();
