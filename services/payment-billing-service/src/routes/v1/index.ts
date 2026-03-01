import {Router} from "express";
import billerRoutes from "./billerRoutes";
import billRoutes from "./billRoutes";
import paymentRoutes from './paymentRoutes'
const router= Router();


router.use("/payments/billers", billerRoutes);
router.use("/payments/bills", billRoutes);
router.use('/payments',paymentRoutes)

export default router;
