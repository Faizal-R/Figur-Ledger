import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IAnalyticsController } from "../interfaces/IAnalyticsController";
import { IAnalyticsService } from "../../services/interfaces/IAnalyticsService";
import { DI_TOKENS } from "../../di/types";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { AnalyticsMessages } from "../../constants/AnalyticsMessages";

@injectable()
export class AnalyticsController implements IAnalyticsController {
  constructor(
    @inject(DI_TOKENS.SERVICES.ANALYTICS_SERVICE)
    private _analyticsService: IAnalyticsService,
  ) {}

  getTraffic = tryCatch(async (req: Request, res: Response) => {
    const { period } = req.query;
    const result = await this._analyticsService.getTrafficAnalytics(
      period as string,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AnalyticsMessages.ANALYTICS_RETRIEVED,
      result,
    );
  });

  getUserActivity = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result =
      await this._analyticsService.getUserActivityAnalytics(userId);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AnalyticsMessages.ANALYTICS_RETRIEVED,
      result,
    );
  });

  getMetrics = tryCatch(async (req: Request, res: Response) => {
    const result = await this._analyticsService.getPerformanceMetrics();
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AnalyticsMessages.METRICS_RETRIEVED,
      result,
    );
  });
}
