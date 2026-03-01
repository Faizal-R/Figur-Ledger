import {Router} from 'express'
import { resolve } from '../../../di';
import { DI_TOKENS } from '../../../di/types';
import { IAccountController } from '../../controllers/interfaces/IAccountController';

const router=Router();

const accountController= resolve<IAccountController>(DI_TOKENS.CONTROLLERS.ACCOUNT_CONTROLLER)

router.post('/',accountController.createAccount)
router.get('/',accountController.getAccountsByUserId)
router.get('/:accountId',accountController.getAccountDetailsById)
router.patch('/:accountId/credit',accountController.amountCredited)
router.patch('/:accountId/debit',accountController.amountDebited)
router.patch('/:accountId/refund',accountController.refundAmount)
router.post("/verify",accountController.verifyUserAccount)
// router.patch('/:accountId',accountController.updateAccount)




export default router