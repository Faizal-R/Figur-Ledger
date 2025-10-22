import Router from "express";
import { resolve } from "../../../di";
import { DI_TOKENS } from "../../../di/types";
import { IAuthController } from "../../controllers/interfaces/IAuthController";

const router = Router();

const authController = resolve<IAuthController>(DI_TOKENS.CONTROLLERS.AUTH_CONTROLLER)

router.post("/login",authController.login)
router.post("/register",authController.register)



export default router