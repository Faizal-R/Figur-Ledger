import { Request, Response } from "express";

export interface ILoanProductController{
    createLoanProduct(req:Request,res:Response):Promise<void>;
    updateLoanProduct(req:Request,res:Response):Promise<void>;
    getAllLoanProducts(req:Request,res:Response):Promise<void>;
}