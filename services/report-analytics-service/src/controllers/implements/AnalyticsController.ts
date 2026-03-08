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

  getDashboardAnalytics = tryCatch(async (req: Request, res: Response) => {
    console.log("AnalyticsController")
    const { type } = req.query as { type: string };
    const analytics = await this._analyticsService.getDashboardAnalytics(type);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AnalyticsMessages.ANALYTICS_RETRIEVED,
      analytics,
    );
  });
}
