import { Request, Response } from "express";

export interface IPaymentController{
    initiateBillPayment(req:Request,res:Response):Promise<void>
    getPaymentHistory(req:Request,res:Response):Promise<void>
}