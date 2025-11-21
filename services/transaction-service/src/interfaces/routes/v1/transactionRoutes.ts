import { Router } from "express";
import { resolve } from "../../../di";
import { DI_TOKENS } from "../../../di/types";
import { ITransactionController } from "../../controllers/interfaces/ITransactionController";



const router = Router();

const transactionController =  resolve<ITransactionController>(DI_TOKENS.CONTROLLER.TRANSACTION_CONTROLLER)

router.post('/deposit',transactionController.processDeposit)
router.post('/deposit/verify',transactionController.verifyPayment)
router.get(
    '/health', (req, res) => {
        res.status(200).send('OK');
    }
)



export default router