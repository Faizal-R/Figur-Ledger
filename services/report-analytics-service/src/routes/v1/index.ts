import { Router } from "express";
import reportRoutes from "./reportRoutes";
import analyticsRoutes from "./analyticsRoutes";

const router = Router();

router.use("/reports", reportRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
