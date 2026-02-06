import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { ILoanEmiController } from "../../controllers/interfaces/ILoanEmiController"

const router=Router()


router.get("/:applicationId",resolve<ILoanEmiController>(DI_TOKENS.CONTROLLERS.LOAN_EMI_CONTROLLER).getAllLoanEmis)

export default router
