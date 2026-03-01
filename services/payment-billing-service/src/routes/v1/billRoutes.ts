import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { IBillController } from "../../controllers/interfaces/IBillController";


const router= Router();
const billController=resolve<IBillController>(DI_TOKENS.CONTROLLERS.BILL_CONTROLLER);
router.get('/', billController.getUtilityBills);

export default router;