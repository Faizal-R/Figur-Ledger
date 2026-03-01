import { Request, Response } from "express";

export interface IAnalyticsController {
  getTraffic(req: Request, res: Response): Promise<void>;
  getUserActivity(req: Request, res: Response): Promise<void>;
  getMetrics(req: Request, res: Response): Promise<void>;
}
