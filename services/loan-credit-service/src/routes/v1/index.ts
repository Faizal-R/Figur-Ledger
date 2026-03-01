import { Router
 } from "express";
import loanProductRoutes from "./loanProductRoutes";
import loanApplicationRoutes from "./loanApplicationRoutes";
import loanEmiRoutes from "./loanEmiRoutes";

 const router=Router()


router.use('/loan/products',loanProductRoutes)
router.use('/loan/applications',loanApplicationRoutes)
router.use('/loan/emi',loanEmiRoutes)

export default router
