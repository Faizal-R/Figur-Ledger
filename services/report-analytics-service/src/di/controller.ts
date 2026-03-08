import container from ".";
import { ReportController } from "../controllers/implements/ReportController";
import { IReportController } from "../controllers/interfaces/IReportController";

import { AnalyticsController } from "../controllers/implements/AnalyticsController";
import { IAnalyticsController } from "../controllers/interfaces/IAnalyticsController";

import { DI_TOKENS } from "./types";

container
  .bind<IReportController>(DI_TOKENS.CONTROLLERS.REPORT_CONTROLLER)
  .to(ReportController);

container
  .bind<IAnalyticsController>(DI_TOKENS.CONTROLLERS.ANALYTICS_CONTROLLER)
  .to(AnalyticsController);
