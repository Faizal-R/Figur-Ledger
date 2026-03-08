import { Router } from "express";
import container from "../../di";
import { IAnalyticsController } from "../../controllers/interfaces/IAnalyticsController";
import { DI_TOKENS } from "../../di/types";

const analyticsRouter = Router();

const analyticsController = container.get<IAnalyticsController>(
  DI_TOKENS.CONTROLLERS.ANALYTICS_CONTROLLER,
);

analyticsRouter.get("/",analyticsController.getDashboardAnalytics);

export default analyticsRouter;
