
import { Request, Response } from "express";

export interface ILoanApplicationController {
    createLoanApplication(req:Request,res:Response): Promise<void>;
    getAllLoanApplications(req:Request,res:Response): Promise<void>;
    approveOrRejectLoanApplication(req:Request,res:Response): Promise<void>;
}