import container from ".";
import { ReportService } from "../services/implements/ReportService";
import { IReportService } from "../services/interfaces/IReportService";
import { AnalyticsService } from "../services/implements/AnalyticsService";
import { IAnalyticsService } from "../services/interfaces/IAnalyticsService";
import { DI_TOKENS } from "./types";

container
  .bind<IReportService>(DI_TOKENS.SERVICES.REPORT_SERVICE)
  .to(ReportService);

container
  .bind<IAnalyticsService>(DI_TOKENS.SERVICES.ANALYTICS_SERVICE)
  .to(AnalyticsService);
