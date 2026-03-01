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

  generateReport = tryCatch(async (req: Request, res: Response) => {
    const { accountId } = req.params;
    console.log(req.query)
    console.log(accountId)
    const report = await this._reportService.getGeneratedStatement(accountId,req.query);
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      ReportMessages.REPORT_GENERATED,
      report,
    );
  });

  getReports = tryCatch(async (req: Request, res: Response) => {
    const reports = await this._reportService.getAllReports();
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      ReportMessages.REPORTS_RETRIEVED,
      reports,
    );
  });

  getReport = tryCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const report = await this._reportService.getReportById(id);
    if (!report) {
      return createResponse(
        res,
        statusCodes.NOT_FOUND,
        false,
        ReportMessages.REPORT_NOT_FOUND,
      );
    }
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      ReportMessages.REPORTS_RETRIEVED,
      report,
    );
  });
}
