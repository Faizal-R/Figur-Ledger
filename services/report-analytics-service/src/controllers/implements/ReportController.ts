import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IReportController } from "../interfaces/IReportController";
import { IReportService } from "../../services/interfaces/IReportService";
import { DI_TOKENS } from "../../di/types";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { ReportMessages } from "../../constants/ReportMessages";

@injectable()
export class ReportController implements IReportController {
  constructor(
    @inject(DI_TOKENS.SERVICES.REPORT_SERVICE)
    private _reportService: IReportService,
  ) {}

  getGeneratedStatement = tryCatch(async (req: Request, res: Response) => {
    const { accountId } = req.params;
    console.log(req.query)
    console.log(accountId)
    const report = await this._reportService.getGeneratedStatement(accountId as string,req.query);
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      ReportMessages.REPORT_GENERATED,
      report,
    );
  });

  
}
