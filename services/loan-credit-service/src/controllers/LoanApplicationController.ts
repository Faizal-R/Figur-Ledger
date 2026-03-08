import { inject, injectable } from "inversify";
import { ILoanApplicationController } from "./interfaces/ILoanApplicationController";
import { Request, Response } from "express";
import { DI_TOKENS } from "../di/types";
import { ILoanApplicationService } from "../services/interfaces/ILoanApplicationService";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { LoanMessages } from "../constants/LoanMessages";
@injectable()
export class LoanApplicationController implements ILoanApplicationController {
  constructor(
    @inject(DI_TOKENS.SERVICES.LOAN_APPLICATION_SERVICE)
    private _loanApplicationService: ILoanApplicationService,
  ) {}
  createLoanApplication = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { loanApplication } = req.body;
      console.log("loanApplication", loanApplication);
      const createdLoanApplication =
        await this._loanApplicationService.createLoanApplication({
          ...loanApplication,
          status: "APPLIED",
          approvedAmount: loanApplication.requestedAmount,
        });
      createResponse(
        res,
        statusCodes.CREATED,
        true,
        LoanMessages.LOAN_APP_CREATED,
        createdLoanApplication,
      );
    },
  );
  getAllLoanApplications = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const loanApplications =
        await this._loanApplicationService.getAllLoanApplications();
      createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        LoanMessages.LOAN_APPS_FETCHED,
        loanApplications,
      );
    },
  );

  approveOrRejectLoanApplication = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      console.log(req.body);
      const { applicationData } = req.body;
      const approvedLoanApplication =
        await this._loanApplicationService.approveOrRejectLoanApplication(
          applicationData,
        );
      createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        LoanMessages.LOAN_APP_APPROVED,
        approvedLoanApplication,
      );
    },
  );

  getAllLoanApplicationsByUserAndStatus = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params;
      console.log("userId", userId);
      const { status } = req.query;
      console.log("status", req.query);
      const loanApplications =
        await this._loanApplicationService.getAllLoanApplicationsByUserAndStatus(
          userId as string,
          status as string,
        );
      createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        LoanMessages.LOAN_APPS_FETCHED,
        loanApplications,
      );
    },
  );

  getLoanStats = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const stats = await this._loanApplicationService.getLoanStats();
      createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        LoanMessages.LOANS_STATS_RETRIEVED,
        stats,
      );
    },
  );
}
