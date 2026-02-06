import { inject, injectable } from "inversify";
import { ILoanApplication } from "../models/LoanApplication";
import { ILoanApplicationService } from "./interfaces/ILoanApplicationService";
import { DI_TOKENS } from "../di/types";
import { ILoanApplicationRepository } from "../repositories/interfaces/ILoanApplicationRepository";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import Api from "../config/api";
import { config } from "dotenv";
import { generateRepaymentSchedules } from "../helpers/generateRepaymentSchedule";
import { IRepaymentScheduleRepository } from "../repositories/interfaces/IRepaymentScheduleRepository";
import { Types } from "mongoose";
config();
@injectable()
export class LoanApplicationService implements ILoanApplicationService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.LOAN_APPLICATION_REPOSITORY)
    private _loanApplicationRepository: ILoanApplicationRepository,
    @inject(DI_TOKENS.REPOSITORIES.REPAYMENT_SCHEDULE_REPOSITORY)
    private _repaymentScheduleRepository: IRepaymentScheduleRepository
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
        status: "APPLIED",
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
      console.log("payload", payload);
      const loanApplication = await this._loanApplicationRepository.update(
        applicationId,
        { status, approvedAmount, approvedBy }
      );
      if (status === "REJECTED") {
        return loanApplication;
      }

      console.log("loanApplication", loanApplication);
      
      const res = await Api.post("/transactions/transfer", {
        senderAccountId: process.env.SYSTEM_ACCOUNT_ID!,
        receiverAccountId: loanApplication?.creditedAccountId,
        amount: loanApplication?.requestedAmount,
      });
      console.log("res", res.data);

      const updatedLoanApplication =
        await this._loanApplicationRepository.update(applicationId, {
          status: "DISBURSED",
          disbursedAt: new Date(),
        });

      const schedules = generateRepaymentSchedules({
        loanApplicationId: new Types.ObjectId(applicationId),
        principal: updatedLoanApplication?.requestedAmount!,
        annualInterestRate: updatedLoanApplication?.annualInterestRate!,
        tenureInMonths: updatedLoanApplication?.tenureInMonths!,
        disbursedAt: updatedLoanApplication?.disbursedAt!,
      });
      console.log("schedules", schedules);
       await this._repaymentScheduleRepository.insertMany(schedules);

     const activeLoan = await this._loanApplicationRepository.update(applicationId, {
  status: "ACTIVE",
});

return activeLoan;
    } catch (error) {
      throw error;
    }
  }

  async getAllLoanApplicationsByUserAndStatus(userId:string,status:string): Promise<ILoanApplication[]> {
    try {
      const loanApplications = await this._loanApplicationRepository.find({
        userId,
        status,
      });
      console.log(

        "ACTIVE:LOAN of USER: ",userId,"Applications : ",loanApplications
      )
      return loanApplications;
    } catch (error) {
      throw error;
    }
  }
}
