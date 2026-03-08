import { Request, Response } from "express";

export interface IUserController {
    getUserProfile(req: Request, res: Response): Promise<void>;
    updateUserProfile(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    getUserStats(req: Request, res: Response): Promise<void>;
}