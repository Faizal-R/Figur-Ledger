import {Router} from 'express'
import v1AuthRoutes from './v1' 

const router=Router()

router.use('/v1',v1AuthRoutes)

export default router