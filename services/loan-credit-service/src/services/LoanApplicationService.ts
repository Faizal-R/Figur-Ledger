import { inject, injectable } from "inversify";
import { ILoanApplication } from "../models/LoanApplication";
import { ILoanApplicationService } from "./interfaces/ILoanApplicationService";
import { DI_TOKENS } from "../di/types";
import { ILoanApplicationRepository } from "../repositories/interfaces/ILoanApplicationRepository";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import Api from "../config/api";
@injectable()
export class LoanApplicationService implements ILoanApplicationService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.LOAN_APPLICATION_REPOSITORY)
    private _loanApplicationRepository: ILoanApplicationRepository
  ) {}
  async createLoanApplication(
    payload: Partial<ILoanApplication>
  ): Promise<ILoanApplication> {
    try {
      const loanApplication =
        await this._loanApplicationRepository.create(payload);
      return loanApplication;
    } catch (error) {
      throw error;
    }
  }
  async getAllLoanApplications(): Promise<ILoanApplication[]> {
    try {
      const loanApplications = await this._loanApplicationRepository.find({
        status:"APPLIED"
      });
      return loanApplications;
    } catch (error) {
      throw error;
    }
  }

  async approveOrRejectLoanApplication(payload: {
    applicationId: string;
    status: "APPROVED" | "REJECTED";
    approvedAmount?: number;
    approvedBy?: string;
  }): Promise<ILoanApplication | null> {
    try {
      const { applicationId, status, approvedAmount, approvedBy } = payload;
      console.log("payload",payload)
      const loanApplication = await this._loanApplicationRepository.update(
        applicationId,
        { status, approvedAmount, approvedBy }
      );
      if(status==="REJECTED"){
        return loanApplication        
      } 
      
      console.log("loanApplication",loanApplication)

     const res= await Api.post("/transactions/transfer",{
        senderAccountId:"6946495c2340c99a34c10bd9",
        receiverAccountId:"6920237390a9111e7c401ee8",
        amount:loanApplication?.requestedAmount,
       
      });
      console.log("res",res.data)
      return loanApplication
    } catch (error) {  
      throw error;
    }
  }
}
  