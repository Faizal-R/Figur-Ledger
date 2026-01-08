import container from ".";


import { DI_TOKENS } from "./types";

import {CreditProfileService} from "../services/CreditProfileService"
import { ICreditProfileService } from "../services/interfaces/ICreditProfileService";

import { ILoanProductService } from "../services/interfaces/ILoanProductService";
import { LoanProductService } from "../services/LoanProductService";
import { LoanApplicationService } from "../services/LoanApplicationService";
import { ILoanApplicationService } from "../services/interfaces/ILoanApplicationService";




container.bind<ICreditProfileService>(DI_TOKENS.SERVICES.CREDIT_PROFILE_SERVICE).to(CreditProfileService).inSingletonScope();
container.bind<ILoanProductService>(DI_TOKENS.SERVICES.LOAN_PRODUCT_SERVICE).to(LoanProductService);
container.bind<ILoanApplicationService>(DI_TOKENS.SERVICES.LOAN_APPLICATION_SERVICE).to(LoanApplicationService);


