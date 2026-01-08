import { Request, Response } from "express";

export interface IAccountController {
  createAccount(req: Request, res: Response): Promise<void>;
  updateAccount(req: Request, res: Response): Promise<void>;
  // deleteAccount(req:Request,res:Response):Promise<void>;
  // getAccountById(req:Request,res:Response):Promise<void>;
  getAccountsByUserId(req: Request, res: Response): Promise<void>;
  amountCredited(req: Request, res: Response): Promise<void>;
  amountDebited(req: Request, res: Response): Promise<void>;
  refundAmount(req: Request, res: Response): Promise<void>;
  verifyUserAccount(req: Request, res: Response): Promise<void>;


}