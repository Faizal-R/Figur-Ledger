import {Router} from 'express'
const router=Router()
import {resolve} from '../../../di'
import { DI_TOKENS } from '../../../di/types'
import IAuthController from '../../controllers/interfaces/IAuthController'



const authController=resolve<IAuthController>(DI_TOKENS.CONTROLLERS.AUTH_CONTROLLER)


router.post('/login',authController.login)
router.post('/register',authController.register)
router.post('/verify-otp',authController.verifyOtp)
router.post('/logout',authController.logout)
router.post('/refresh',authController.refreshAccessToken)


export default router