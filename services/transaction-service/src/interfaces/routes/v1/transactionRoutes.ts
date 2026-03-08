import { Router } from "express";
import { resolve } from "../../../infra/di";
import { DI_TOKENS } from "../../../infra/di/types";
import { ITransactionController } from "../../controllers/interfaces/ITransactionController";



const router = Router();

const transactionController = resolve<ITransactionController>(DI_TOKENS.CONTROLLER.TRANSACTION_CONTROLLER)

router.post('/deposit', transactionController.processDeposit)
router.post('/withdraw', transactionController.processWithdrawal)
router.get('/history/:accountId', transactionController.getTransactionHistory)
router.post('/transfer',transactionController.processTransfer)
router.get('/analytics/stats', transactionController.getTransactionStats)




export default router