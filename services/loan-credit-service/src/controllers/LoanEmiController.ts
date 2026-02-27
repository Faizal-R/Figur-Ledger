import { Request, Response } from "express";
import { ILoanEmiController } from "./interfaces/ILoanEmiController";
import { IEmiService } from "../services/interfaces/IEmiService";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types";
import { LoanMessages } from "../constants/LoanMessages";
@injectable()
export class LoanEmiController implements ILoanEmiController {
  constructor(
    @inject(DI_TOKENS.SERVICES.EMI_SERVICE)
    private readonly _loanEmiService: IEmiService,
  ) {}
  getAllLoanEmis = tryCatch(async (req: Request, res: Response) => {
    const { applicationId } = req.params;
    const emis =
      await this._loanEmiService.getAllEmisByLoanApplicationId(applicationId);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      LoanMessages.EMI_FETCHED,
      emis,
    );
  });
}
