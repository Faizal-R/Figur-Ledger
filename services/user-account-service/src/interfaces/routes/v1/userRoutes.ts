import { Router } from "express";
import { DI_TOKENS } from "../../../di/types";
import { IUserController } from "../../controllers/interfaces/IUserController";
import { resolve } from "../../../di";



const router = Router();
const userController=resolve<IUserController>(DI_TOKENS.CONTROLLERS.USER_CONTROLLER)

router.get("/analytics/stats",userController.getUserStats)
router.get("/:userId",userController.getUserProfile)
router.put("/:userId",userController.updateUserProfile)
router.post("/",userController.createUser)






export default router