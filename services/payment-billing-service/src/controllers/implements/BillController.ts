import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { PaymentMessages } from "../../constants/PaymentMessages";
import { Request, Response } from "express";
import { generateUtilityBill, TBillCategory } from "../../utils/billGenerator";
import { IBillController } from "../interfaces/IBillController";
import { injectable } from "inversify";
@injectable()
export class BillController implements IBillController {
  constructor() {}

  getUtilityBills = tryCatch(async (req: Request, res: Response) => {
    const { category } = req.query;
    if (!category) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        PaymentMessages.CATEGORY_REQUIRED,
      );
    }
    const bill = generateUtilityBill(category as TBillCategory);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      PaymentMessages.BILL_GENERATED,
      bill,
    );
  });
}
