import { DI_TOKENS } from "./types";
import container from "./index";

import { IAccountServiceClient } from "../clients/http/interfaces/IAccountServiceClient";
import { AccountServiceClient } from "../clients/http/accountServiceClient";

import { IUserServiceClient } from "../clients/http/interfaces/IUserServiceClient";
import { UserServiceClient } from "../clients/http/userServiceClient";

import { ITransactionServiceClient } from "../clients/http/interfaces/ITransactionServiceClient";
import { TransactionServiceClient } from "../clients/http/transactionServiceClient";

import { ILoanServiceClient } from "../clients/http/interfaces/ILoanServiceClient";
import { LoanServiceClient } from "../clients/http/loanServiceClient";

import { IBillingServiceClient } from "../clients/http/interfaces/IBillingServiceClient";
import { BillingServiceClient } from "../clients/http/billingServiceClient";

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

container
  .bind<ILoanServiceClient>(DI_TOKENS.CLIENTS.LOAN_SERVICE_CLIENT)
  .to(LoanServiceClient)
  .inSingletonScope();

container
  .bind<IBillingServiceClient>(DI_TOKENS.CLIENTS.BILLING_SERVICE_CLIENT)
  .to(BillingServiceClient)
  .inSingletonScope();
