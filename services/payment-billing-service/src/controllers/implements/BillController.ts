import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { Request, Response } from "express";
import { generateUtilityBill, TBillCategory } from "../../utils/billGenerator";
import { IBillController } from "../interfaces/IBillController";
import {  injectable } from "inversify";
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
        "Category query parameter is required",
      );
    }
    const bill= generateUtilityBill (category as TBillCategory);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Utility bill generated successfully",
      bill
    );
  });
}
