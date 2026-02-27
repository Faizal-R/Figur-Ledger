import container from ".";

import { IBillerRepository } from "../repositories/interfaces/IBillerRepository";
import { BillerRepository } from "../repositories/implements/BillerRepository";

import { IUsersSavedBillersRepository } from "../repositories/interfaces/IUsersSavedBillersRepository";
import { UsersSavedBillersRepository } from "../repositories/implements/UsersSavedBillersRepository";


import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";
import { PaymentRepository } from "../repositories/implements/PaymentRepository";

import { IInvoiceRepository } from "../repositories/interfaces/IInvoiceRepository";
import { InvoiceRepository } from "../repositories/implements/InvoiceRepository";
import { DI_TOKENS } from "./types";

container
  .bind<IBillerRepository>(DI_TOKENS.REPOSITORIES.BILLER_REPOSITORY)
  .to(BillerRepository)
  .inSingletonScope();
container
  .bind<IUsersSavedBillersRepository>(
    DI_TOKENS.REPOSITORIES.USERS_SAVED_BILLERS_REPOSITORY,
  )
  .to(UsersSavedBillersRepository)
  .inSingletonScope();

  container.bind<IPaymentRepository>(DI_TOKENS.REPOSITORIES.PAYMENT_REPOSITORY)
  .to(PaymentRepository)
  .inSingletonScope();

  container.bind<IInvoiceRepository>(DI_TOKENS.REPOSITORIES.INVOICE_REPOSITORY).to(InvoiceRepository)