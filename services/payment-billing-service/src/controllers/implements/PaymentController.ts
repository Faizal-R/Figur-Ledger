import { inject, injectable } from "inversify";
import { IPaymentController } from "../interfaces/IPaymentController";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { Request, Response } from "express";
import { DI_TOKENS } from "../../di/types";
import { IPaymentService } from "../../services/interfaces/IPaymentService";
import { statusCodes } from "@figur-ledger/shared";
import { PaymentMessages } from "../../constants/PaymentMessages";
@injectable()
export class PaymentController implements IPaymentController {
  constructor(
    @inject(DI_TOKENS.SERVICES.PAYMENT_SERVICE)
    private _paymentService: IPaymentService,
  ) {}

  initiateBillPayment = tryCatch(async (req: Request, res: Response) => {
    const { paymentData, billDetails } = req.body;
    console.log("reqBody", req.body);

    const processedPayment = await this._paymentService.initiateBillPayment(
      paymentData,
      billDetails,
    );

    createResponse(
      res,
      statusCodes.CREATED,
      true,
      PaymentMessages.PAYMENT_COMPLETED,
      processedPayment,
    );
  });

  getPaymentHistory = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.query;

    const paymentHistory = await this._paymentService.getPaymentHistory(
      userId as string,
    );

    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      PaymentMessages.PAYMENT_HISTORY_FETCHED,
      paymentHistory,
    );
  });
}
