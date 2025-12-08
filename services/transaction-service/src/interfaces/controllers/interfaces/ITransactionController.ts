import { Request, Response } from "express";

export interface ITransactionController{
    processDeposit(req:Request,res:Response):Promise<void>;
    processWithdrawal(req:Request,res:Response):Promise<void>;
    getTransactionHistory(req:Request,res:Response):Promise<void>;
    processTransfer(req:Request,res:Response):Promise<void>;
}