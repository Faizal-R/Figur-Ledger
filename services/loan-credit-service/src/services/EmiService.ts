import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types";
import { IRepaymentSchedule } from "../models/RepaymentSchedule";
import { IRepaymentScheduleRepository } from "../repositories/interfaces/IRepaymentScheduleRepository";
import Api from "../config/api";
import { ILoanApplicationRepository } from "../repositories/interfaces/ILoanApplicationRepository";
import { statusCodes } from "@figur-ledger/shared";
@injectable()
export class EmiService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.REPAYMENT_SCHEDULE_REPOSITORY)
    private readonly _repaymentRepo: IRepaymentScheduleRepository,
    @inject(DI_TOKENS.REPOSITORIES.LOAN_APPLICATION_REPOSITORY)
    private readonly _loanApplicationRepo: ILoanApplicationRepository
  ) {}

  async processEmis() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("today", today);
    const emis = await this._repaymentRepo.find({
      dueDate: today,
      status: "PENDING",
    });
    if (emis.length === 0) {
      console.log("No emis found");
      return;
    }
    for (const emi of emis) {
      await this.processSingleEmi(emi);
    }
  }

  async processSingleEmi(emi: IRepaymentSchedule): Promise<void> {
    try {
      if (emi.status === "PAID") return;
      const loanApplication = await this._loanApplicationRepo.findById(
        emi.loanApplicationId!.toString()
      );
      const res = await Api.post("/transactions/transfer", {
        receiverAccountId: process.env.SYSTEM_ACCOUNT_ID!,
        senderAccountId: loanApplication?.creditedAccountId!,
        amount: emi.totalAmount,
      });
      console.log("res", res.data);
      if (res.status === statusCodes.SUCCESS) {
        await this._repaymentRepo.update(emi._id!.toString(), {
          status: "PAID",
        });
      }
    } catch (error) {
      console.log("EMI error", error);
    }
  }
  getAllEmisByLoanApplicationId(
    loanApplicationId: string
  ): Promise<IRepaymentSchedule[]> {
    return this._repaymentRepo.find({ loanApplicationId });
  }
}
