import container from '.'

import { BillerService } from '../services/implements/BillerService'
import { IBillerService } from '../services/interfaces/IBillerService';

import { PaymentService } from '../services/implements/PaymentService';
import { IPaymentService } from '../services/interfaces/IPaymentService';
import { DI_TOKENS } from './types';


container.bind<IBillerService>(DI_TOKENS.SERVICES.BILLER_SERVICE).to(BillerService);
container.bind<IPaymentService>(DI_TOKENS.SERVICES.PAYMENT_SERVICE).to(PaymentService);