import container from ".";
import { ILoanApplicationController } from "../controllers/interfaces/ILoanApplicationController";
import { ILoanProductController } from "../controllers/interfaces/ILoanProductController";
import { LoanApplicationController } from "../controllers/LoanApplicationController";
import { LoanProductController } from "../controllers/LoanProductController";
import { DI_TOKENS } from "./types";


container.bind<ILoanProductController>(DI_TOKENS.CONTROLLERS.LOAN_PRODUCT_CONTROLLER).to(LoanProductController)
container.bind<ILoanApplicationController>(DI_TOKENS.CONTROLLERS.LOAN_APPLICATION_CONTROLLER).to(LoanApplicationController)

// container.bind<ICreditProfileController>(DI_TOKENS.CONTROLLERS.CREDIT_PROFILE_CONTROLLER).to(CreditProfileController)