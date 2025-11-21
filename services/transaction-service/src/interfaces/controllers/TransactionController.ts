import { inject, injectable } from "inversify";
import { ITransactionController } from "./interfaces/ITransactionController";
import { Request, Response } from "express";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { ITransactionUseCase } from "../../use-cases/useCases/interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../di/types";
import { statusCodes } from "@figur-ledger/shared";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(
    @inject(DI_TOKENS.USE_CASES.TRANSACTION_USE_CASES)
    private readonly _transactionUseCases: ITransactionUseCase
  ) {}

  processDeposit = tryCatch(async (req: Request, res: Response) => {
    const { accountId, amount } = req.body;
    const result = await this._transactionUseCases.processDeposit(
      accountId,
      amount
    );
    console.log(result);

    createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Deposit initiated successfully",
      result
    );
  });

  verifyPayment = tryCatch(async (req: Request, res: Response) => {
    const { orderId, paymentId, signature,txId } = req.body;
    console.log(req.body);
    const result = await this._transactionUseCases.verifyPayment(
      orderId,
      paymentId,
      signature,
      txId
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Payment verified successfully",
      result
    );
  });
}
