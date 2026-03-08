import { Request, Response } from "express";

export interface IAnalyticsController {
  getDashboardAnalytics(req: Request, res: Response): Promise<void>;
}
