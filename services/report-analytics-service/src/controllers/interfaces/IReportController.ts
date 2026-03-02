import { Request, Response } from "express";

export interface IReportController {
  getGeneratedStatement(req: Request, res: Response): Promise<void>;
}
