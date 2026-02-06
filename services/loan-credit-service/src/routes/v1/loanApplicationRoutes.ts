import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { ILoanApplicationController } from "../../controllers/interfaces/ILoanApplicationController";

const router=Router()

const loanApplicationController= resolve<ILoanApplicationController>(DI_TOKENS.CONTROLLERS.LOAN_APPLICATION_CONTROLLER)

router.post('/apply',loanApplicationController.createLoanApplication)
router.put('/update-status',loanApplicationController.approveOrRejectLoanApplication)

router.get('/',loanApplicationController.getAllLoanApplications)

export default router