import { Router } from "express";
import { DI_TOKENS } from "../../../di/types";
import { IUserController } from "../../controllers/interfaces/IUserController";
import { resolve } from "../../../di";
import { IAccountController } from "../../controllers/interfaces/IAccountController";


const router = Router();
const userController=resolve<IUserController>(DI_TOKENS.CONTROLLERS.USER_CONTROLLER)
const accountController=resolve<IAccountController>(DI_TOKENS.CONTROLLERS.ACCOUNT_CONTROLLER)

router.get("/:userId",userController.getUserProfile)
router.put("/:userId",userController.updateUserProfile)
router.get('/accounts',accountController.getAccountsByUserId)
router.post('/accounts',accountController.createAccount)
router.put('/accounts/:accountId',accountController.updateAccount)





export default router