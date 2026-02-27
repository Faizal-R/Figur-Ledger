import {Router} from 'express'
import { resolve } from '../../di';
import { DI_TOKENS } from '../../di/types';
import { IPaymentController } from '../../controllers/interfaces/IPaymentController';


const router=Router();

const paymentController=resolve<IPaymentController>(DI_TOKENS.CONTROLLERS.PAYMENT_CONTROLLER)


router.post('/',paymentController.initiateBillPayment)
router.get('/',paymentController.getPaymentHistory)

export default router;