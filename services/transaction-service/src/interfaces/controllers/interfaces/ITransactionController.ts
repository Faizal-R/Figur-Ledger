import { Request, Response } from "express";

export interface ITransactionController{
    processDeposit(req:Request,res:Response):Promise<void>;
    verifyPayment(req:Request,res:Response):Promise<void>;
}