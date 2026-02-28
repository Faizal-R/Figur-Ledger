import { Request, Response } from "express";

export interface IReportController {
  generateReport(req: Request, res: Response): Promise<void>;
  getReports(req: Request, res: Response): Promise<void>;
  getReport(req: Request, res: Response): Promise<void>;
}
