import { inject, injectable } from "inversify";
import { ITransactionController } from "./interfaces/ITransactionController";
import { Request, Response } from "express";
import { createResponse, tryCatch } from "@figur-ledger/handlers";
import { ITransactionUseCase } from "../../use-cases/useCases/interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../infra/di/types";
import { statusCodes } from "@figur-ledger/shared";
import { ITransferUseCase } from "../../use-cases/useCases/interfaces/ITransferUseCase";
import { ITransactionFilters } from "../../types/ITransactionFilters";
import { TransactionMessages } from "../../infra/constants/TransactionMessages";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(
    @inject(DI_TOKENS.USE_CASES.TRANSACTION_USE_CASES)
    private readonly _transactionUseCases: ITransactionUseCase,
    @inject(DI_TOKENS.USE_CASES.TRANSFER_USE_CASE)
    private readonly _tranferUseCase: ITransferUseCase,
  ) {}

  processDeposit = tryCatch(async (req: Request, res: Response) => {
    const { accountId, amount, referenceId } = req.body;

    if (!accountId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.ACCOUNT_ID_REQUIRED,
      );
    }

    if (!referenceId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.REFERENCE_ID_REQUIRED,
      );
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.INVALID_AMOUNT,
      );
    }

    console.log("Processing deposit:", { accountId, numericAmount });

    const result = await this._transactionUseCases.processDeposit(
      accountId,
      numericAmount,
      referenceId,
    );

    console.log(result);

    createResponse(
      res,
      statusCodes.CREATED,
      true,
      TransactionMessages.DEPOSIT_SUCCESS,
      result,
    );
  });

  processWithdrawal = tryCatch(async (req: Request, res: Response) => {
    const { accountId, amount, referenceId } = req.body;
    if (!accountId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.ACCOUNT_ID_REQUIRED,
      );
    }

    if (!referenceId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.REFERENCE_ID_REQUIRED,
      );
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.INVALID_AMOUNT,
      );
    }

    console.log("Processing Withdrawal:", { accountId, numericAmount });

    const result = await this._transactionUseCases.processWithdrawal(
      accountId,
      numericAmount,
      referenceId,
    );

    console.log(result);

    createResponse(
      res,
      statusCodes.CREATED,
      true,
      TransactionMessages.WITHDRAWAL_SUCCESS,
      result,
    );
  });

  getTransactionHistory = tryCatch(async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { page, ...filterQuery } = req.query;
    console.log(filterQuery);
    console.log("accountId", req.params);
    if (!accountId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.ACCOUNT_ID_REQUIRED,
      );
    }
    const pageNumber = page ? Number(page) : 1;
    const { transactions, totalPages } =
      await this._transactionUseCases.getTransactionHistory(
        accountId as string,
        pageNumber,
        filterQuery as unknown as ITransactionFilters,
      );
    console.log("Fetched transactions for userId", { accountId, transactions });
    createResponse(
      res,
      statusCodes.ACCEPTED,
      true,
      TransactionMessages.HISTORY_FETCH_SUCCESS,
      { transactions, totalPages },
    );
  });

  processTransfer = tryCatch(async (req: Request, res: Response) => {
    const { senderAccountId, receiverAccountId, amount } = req.body;
    console.log(
      "processingTransfer",
      senderAccountId,
      receiverAccountId,
      amount,
    );

    if (!senderAccountId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.SENDER_ACCOUNT_REQUIRED,
      );
    }

    if (!receiverAccountId) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.RECEIVER_ACCOUNT_REQUIRED,
      );
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        TransactionMessages.INVALID_AMOUNT,
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
      TransactionMessages.TRANSFER_SUCCESS,
      result,
    );
  });

  getTransactionStats = tryCatch(async (req: Request, res: Response) => {
    const { type } = req.query as { type: "daily" | "monthly" | "yearly" };
    const period = type || "daily";

    const stats = await this._transactionUseCases.getTransactionStats(period);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Transaction stats fetched successfully",
      stats,
    );
  });
}
