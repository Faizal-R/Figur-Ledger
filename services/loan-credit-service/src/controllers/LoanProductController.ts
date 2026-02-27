import { inject, injectable } from "inversify";
import { ILoanProductService } from "../services/interfaces/ILoanProductService";
import { ILoanProductController } from "./interfaces/ILoanProductController";
import { DI_TOKENS } from "../di/types";
import { tryCatch, createResponse } from "@figur-ledger/handlers";
import { statusCodes } from "@figur-ledger/shared";
import { Request, Response } from "express";
import { LoanMessages } from "../constants/LoanMessages";

@injectable()
export class LoanProductController implements ILoanProductController {
  constructor(
    @inject(DI_TOKENS.SERVICES.LOAN_PRODUCT_SERVICE)
    private readonly _loanProductService: ILoanProductService,
  ) {}

  createLoanProduct = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { loanProduct } = req.body;
      console.log("loanProduct", loanProduct);
      //add validation

      const createdLoanProduct =
        await this._loanProductService.createLoanProduct({
          ...loanProduct,
          isActive: true,
        });
      return createResponse(
        res,
        statusCodes.CREATED,
        true,
        LoanMessages.LOAN_PRODUCT_CREATED,
        createdLoanProduct,
      );
    },
  );

  updateLoanProduct = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { loanProduct } = req.body;
      //add validation

      const updatedLoanProduct =
        await this._loanProductService.updateLoanProduct(loanProduct);
      return createResponse(
        res,
        statusCodes.CREATED,
        true,
        LoanMessages.LOAN_PRODUCT_UPDATED,
        updatedLoanProduct,
      );
    },
  );

  getAllLoanProducts = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params;
      const loanProducts =
        await this._loanProductService.getAllLoanProducts(userId);
      return createResponse(
        res,
        statusCodes.SUCCESS,
        true,
        LoanMessages.LOAN_PRODUCTS_FETCHED,
        loanProducts,
      );
    },
  );
}
