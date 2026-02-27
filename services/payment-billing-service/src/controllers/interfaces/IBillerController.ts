import { Request, Response } from "express";

export interface IBillerController {
  createBiller(req: Request, res: Response): Promise<void>;
  updateBiller(req: Request, res: Response): Promise<void>;
    deleteBiller(req: Request, res: Response): Promise<void>;
    getAllBillers(req: Request, res: Response): Promise<void>;
    saveBiller(req: Request, res: Response): Promise<void>;
    getAllSavedBillers(req: Request, res: Response): Promise<void>;
}