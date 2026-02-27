import container from ".";


import { IAccountServiceClient } from "../config/http/interfaces/IAccountServiceClient";
import { IUserServiceClient } from "../config/http/interfaces/IUserServiceClient";
import { ITransactionServiceClient } from "../config/http/interfaces/ITransactionServiceClient";
import { AccountServiceClient } from "../config/http/accountServiceClient";
import { UserServiceClient } from "../config/http/userServiceClient";
import { TransactionServiceClient } from "../config/http/transactionServiceClient";
import { DI_TOKENS } from "./types";

container.bind<IAccountServiceClient>(DI_TOKENS.CLIENTS.ACCOUNT_SERVICE_CLIENT).to(AccountServiceClient).inSingletonScope();
container.bind<IUserServiceClient>(DI_TOKENS.CLIENTS.USER_SERVICE_CLIENT).to(UserServiceClient).inSingletonScope();

container.bind<ITransactionServiceClient>(DI_TOKENS.CLIENTS.TRANSACTION_SERVICE_CLIENT).to(TransactionServiceClient).inSingletonScope();