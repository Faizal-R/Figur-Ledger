import { Router
 } from "express";
import loanProductRoutes from "./loanProductRoutes";
import loanApplicationRoutes from "./loanApplicationRoutes";

 const router=Router()


router.use('/loan/products',loanProductRoutes)
router.use('/loan/applications',loanApplicationRoutes)

export default router
