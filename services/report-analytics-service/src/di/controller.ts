import container from ".";
import { ReportController } from "../controllers/implements/ReportController";
import { IReportController } from "../controllers/interfaces/IReportController";

import { DI_TOKENS } from "./types";

container
  .bind<IReportController>(DI_TOKENS.CONTROLLERS.REPORT_CONTROLLER)
  .to(ReportController);
