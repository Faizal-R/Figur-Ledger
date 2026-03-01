import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { IBillerController } from "../../controllers/interfaces/IBillerController";


const router= Router();
const billerController = resolve<IBillerController>(DI_TOKENS.CONTROLLERS.BILLER_CONTROLLER);
router.post('/', billerController.createBiller);
router.put('/:billerId', billerController.updateBiller);
router.delete('/:billerId', billerController.deleteBiller);
router.get('/', billerController.getAllBillers);
router.post('/save', billerController.saveBiller);
router.get('/saved', billerController.getAllSavedBillers);


export default router;