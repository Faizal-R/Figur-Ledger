import container from ".";
import { ILoanApplicationController } from "../controllers/interfaces/ILoanApplicationController";
import { ILoanEmiController } from "../controllers/interfaces/ILoanEmiController";
import { ILoanProductController } from "../controllers/interfaces/ILoanProductController";
import { LoanApplicationController } from "../controllers/LoanApplicationController";
import { LoanEmiController } from "../controllers/LoanEmiController";
import { LoanProductController } from "../controllers/LoanProductController";
import { DI_TOKENS } from "./types";


container.bind<ILoanProductController>(DI_TOKENS.CONTROLLERS.LOAN_PRODUCT_CONTROLLER).to(LoanProductController)
container.bind<ILoanApplicationController>(DI_TOKENS.CONTROLLERS.LOAN_APPLICATION_CONTROLLER).to(LoanApplicationController)

// container.bind<ICreditProfileController>(DI_TOKENS.CONTROLLERS.CREDIT_PROFILE_CONTROLLER).to(CreditProfileController)
container.bind<ILoanEmiController>(DI_TOKENS.CONTROLLERS.LOAN_EMI_CONTROLLER).to(LoanEmiController)
