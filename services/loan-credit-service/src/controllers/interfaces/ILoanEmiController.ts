import { Request, Response } from "express";

export interface ILoanEmiController{
    getAllLoanEmis(req:Request,res:Response):Promise<void>
}