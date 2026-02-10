import container from '.'

import { BillerController } from '../controllers/implements/BillerController';
import { IBillerController } from '../controllers/interfaces/IBillerController';

import { IBillController } from '../controllers/interfaces/IBillController';
import { BillController } from '../controllers/implements/BillController';

import { PaymentController } from '../controllers/implements/PaymentController';
import { IPaymentController } from '../controllers/interfaces/IPaymentController';
import { DI_TOKENS } from './types';


container.bind<IBillerController>(DI_TOKENS.CONTROLLERS.BILLER_CONTROLLER).to(BillerController);
container.bind<IBillController>(DI_TOKENS.CONTROLLERS.BILL_CONTROLLER).to(BillController);
container.bind<IPaymentController>(DI_TOKENS.CONTROLLERS.PAYMENT_CONTROLLER).to(PaymentController)