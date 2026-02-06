import { Router } from "express";
import { resolve } from "../../di";
import { ILoanProductController } from "../../controllers/interfaces/ILoanProductController";
import { DI_TOKENS } from "../../di/types";

const router=Router()

const loanProductController= resolve<ILoanProductController>(DI_TOKENS.CONTROLLERS.LOAN_PRODUCT_CONTROLLER)

router.post('/',loanProductController.createLoanProduct)

router.put('/:loanProductId',loanProductController.updateLoanProduct)

router.get('/:userId',loanProductController.getAllLoanProducts)

export default router