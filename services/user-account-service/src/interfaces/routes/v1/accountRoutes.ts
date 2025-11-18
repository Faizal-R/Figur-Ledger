import {Router} from 'express'
import { resolve } from '../../../di';
import { DI_TOKENS } from '../../../di/types';
import { IAccountController } from '../../controllers/interfaces/IAccountController';

const router=Router();

const accountController= resolve<IAccountController>(DI_TOKENS.CONTROLLERS.ACCOUNT_CONTROLLER)

router.post('/create',accountController.createAccount)
router.get('/',accountController.getAccountsByUserId)
router.patch('/:accountId',accountController.updateAccount)




export default router