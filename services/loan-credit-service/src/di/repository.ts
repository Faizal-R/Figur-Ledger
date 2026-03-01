import { DI_TOKENS } from "./types";
import container from ".";
import { LoanApplicationRepository } from "../repositories/LoanApplicationRepository";
import { ILoanApplicationRepository } from "../repositories/interfaces/ILoanApplicationRepository";
import { LoanProductRepository } from "../repositories/LoanProductRepository";
import { ILoanProductRepository } from "../repositories/interfaces/ILoanProductRepository";
import { CreditProfileRepository } from "../repositories/CreditProfileRepository";
import { ICreditProfileRepository } from "../repositories/interfaces/ICreditProfileRepository";
import { RepaymentScheduleRepository } from "../repositories/RepaymentScheduleRepository";
import { IRepaymentScheduleRepository } from "../repositories/interfaces/IRepaymentScheduleRepository";

container
  .bind<ILoanApplicationRepository>(
    DI_TOKENS.REPOSITORIES.LOAN_APPLICATION_REPOSITORY,
  )
  .to(LoanApplicationRepository);
container
  .bind<ILoanProductRepository>(DI_TOKENS.REPOSITORIES.LOAN_PRODUCT_REPOSITORY)
  .to(LoanProductRepository);
container
  .bind<ICreditProfileRepository>(
    DI_TOKENS.REPOSITORIES.CREDIT_PROFILE_REPOSITORY,
  )
  .to(CreditProfileRepository);
container
  .bind<IRepaymentScheduleRepository>(
    DI_TOKENS.REPOSITORIES.REPAYMENT_SCHEDULE_REPOSITORY,
  )
  .to(RepaymentScheduleRepository);
