import { inject, injectable } from "inversify";
import { ITransactionController } from "./interfaces/ITransactionController";
import { Request, Response } from "express";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { ITransactionUseCase } from "../../use-cases/useCases/interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../infra/di/types";
import { statusCodes } from "@figur-ledger/shared";
import { ITransferUseCase } from "../../use-cases/useCases/interfaces/ITransferUseCase";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(
    @inject(DI_TOKENS.USE_CASES.TRANSACTION_USE_CASES)
    private readonly _transactionUseCases: ITransactionUseCase,
    @inject(DI_TOKENS.USE_CASES.TRANSFER_USE_CASE)
    private readonly _tranferUseCase:ITransferUseCase
  ) {}

processDeposit = tryCatch(async (req: Request, res: Response) => {
  const { accountId, amount, referenceId } = req.body;

  if (!accountId) {
    return createResponse(res, statusCodes.BAD_REQUEST, false, "accountId is required");
  }

  if (!referenceId) {
    return createResponse(res, statusCodes.BAD_REQUEST, false, "referenceId is required");
  }

  const numericAmount = Number(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "Deposit amount must be a number greater than 0"
    );
  }

  console.log("Processing deposit:", { accountId, numericAmount });

  const result = await this._transactionUseCases.processDeposit(
    accountId,
    numericAmount,
    referenceId
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


 processWithdrawal = tryCatch(async (req: Request, res: Response) => {
  const { accountId, amount, referenceId } = req.body;
  if (!accountId) {
    return createResponse(res, statusCodes.BAD_REQUEST, false, "accountId is required");
  }

  if (!referenceId) {
    return createResponse(res, statusCodes.BAD_REQUEST, false, "referenceId is required");
  }

  const numericAmount = Number(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "Withdrawal amount must be a number greater than 0"
    );
  }

  console.log("Processing Withdrawal:", { accountId, numericAmount });

  const result = await this._transactionUseCases.processWithdrawal(
    accountId,
    numericAmount,
    referenceId
  );

  console.log(result);

  createResponse(
    res,
    statusCodes.CREATED,
    true,
    "Withdrawal initiated successfully",
    result
  );
});

  getTransactionHistory = tryCatch(async (req: Request, res: Response) => {
    const { accountId } = req.params;

    if (!accountId) {
      return createResponse(res, statusCodes.BAD_REQUEST, false, "userId is required");
    }
    const transactions = await this._transactionUseCases.getTransactionHistory(accountId);
   console.log("Fetched transactions for userId", { accountId, transactions });
    createResponse(
      res,
      statusCodes.ACCEPTED,
      true,
      "Transaction history fetched successfully",
      transactions
    );
  })

  processTransfer = tryCatch(async (req: Request, res: Response) => {
  const {
    senderAccountId,
    receiverAccountId,
    amount,
  } = req.body;
  console.log("processingTransfer",senderAccountId,receiverAccountId,amount)

  if (!senderAccountId) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "senderAccountId is required"
    );
  }

  if (!receiverAccountId) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "receiverAccountId is required"
    );
  }

 
  const numericAmount = Number(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return createResponse(
      res,
      statusCodes.BAD_REQUEST,
      false,
      "Transfer amount must be a number greater than 0"
    );
  }

  console.log("Processing transfer:", {
    senderAccountId,
    receiverAccountId,
    numericAmount,
  });

  const result = await this._tranferUseCase.execute({
    senderAccountId,
    receiverAccountId,
    amount: numericAmount,
  });

  createResponse(
    res,
    statusCodes.CREATED,
    true,
    "Amount Transfered to the Account Successfully",
    result
  );
});

}
