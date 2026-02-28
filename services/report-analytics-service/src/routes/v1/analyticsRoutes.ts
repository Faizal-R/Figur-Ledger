import { Router } from "express";
import { resolve } from "../../di";
import { DI_TOKENS } from "../../di/types";
import { IAnalyticsController } from "../../controllers/interfaces/IAnalyticsController";

const router = Router();
const analyticsController = resolve<IAnalyticsController>(
  DI_TOKENS.CONTROLLERS.ANALYTICS_CONTROLLER,
);

router.get("/traffic", analyticsController.getTraffic);
router.get("/user-activity/:userId", analyticsController.getUserActivity);
router.get("/metrics", analyticsController.getMetrics);

export default router;
