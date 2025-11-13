import {Router} from 'express'
const router=Router()
import {resolve} from '../../../di'
import { DI_TOKENS } from '../../../di/types'
import IAuthController from '../../controllers/interfaces/IAuthController'



const authController=resolve<IAuthController>(DI_TOKENS.CONTROLLERS.AUTH_CONTROLLER)

router.get("/health",(req,res)=>{
    res.json({Message:
        "slj"
    })
})
router.post('/login',authController.login)
router.post('/register',authController.register)
router.post('/logout',authController.logout)


export default router