import { inject, injectable } from "inversify";
import { IAccountController } from "../interfaces/IAccountController";
import { DI_TOKENS } from "../../../di/types";
import { IAccountUseCase } from "../../../interator/useCases/interfaces/IAccountUseCase";
import { Account } from "../../../domain/entities/Account";
import { Request, Response } from "express";
import { tryCatch, createResponse } from "@figur-ledger/handlers";
import { AccountSchema } from "../../validations/account/AccountSchema";

import { statusCodes } from "@figur-ledger/shared";
import { AccountMessages } from "./AccountMessages";
@injectable()
export class AccountController implements IAccountController {
  constructor(
    @inject(DI_TOKENS.USECASES.ACCOUNT_USECASE)
    private readonly _accountUseCase: IAccountUseCase,
  ) {}

  createAccount = tryCatch(async (req: Request, res: Response) => {
    // const userId = req.query.userId as string;
    console.log("req.body", req.body);
    const accountPayload = req.body;
    const validatedAccountPayload = AccountSchema.safeParse(accountPayload);

    if (!validatedAccountPayload.success) {
      console.log(validatedAccountPayload.error.issues);
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        validatedAccountPayload.error.issues[0].message,
        null,
      );
      return;
    }

    const createdAccount = await this._accountUseCase.createAccount(
      validatedAccountPayload.data,
    );
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      AccountMessages.ACCOUNT_OPENED,
      createdAccount,
    );
  });

  updateAccount = tryCatch(async (req: Request, res: Response) => {
    const accountId = req.params.accountId as string;
    const accountPayload = req.body;
    const validatedAccountPayload = AccountSchema.safeParse(accountPayload);
    if (!validatedAccountPayload.success) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        validatedAccountPayload.error.issues[0].message,
        null,
      );
      return;
    }
    const updatedAccount = await this._accountUseCase.updateAccount(
      accountId,
      validatedAccountPayload.data,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.ACCOUNT_UPDATED,
      updatedAccount,
    );
  });

  getAccountsByUserId = tryCatch(async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    if (!userId) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        AccountMessages.USER_ID_REQUIRED,
        null,
      );
      return;
    }

    const accounts = await this._accountUseCase.getAccountsByUserId(userId);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.ACCOUNTS_FETCHED,
      accounts,
    );
  });

  amountCredited = tryCatch(async (req: Request, res: Response) => {
    const accountId = req.params.accountId as string;
    const { amount } = req.body;

    if (amount <= 0) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        AccountMessages.INVALID_AMOUNT,
        null,
      );
      return;
    }
    const updatedAmount = await this._accountUseCase.amountCredited(
      accountId,
      amount,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.AMOUNT_CREDITED,
      updatedAmount,
    );
  });
  amountDebited = tryCatch(async (req: Request, res: Response) => {
    const accountId = req.params.accountId as string;
    const { amount } = req.body;

    if (amount <= 0) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        AccountMessages.INVALID_AMOUNT,
        null,
      );
      return;
    }
    const updatedAmount = await this._accountUseCase.amountDebited(
      accountId,
      amount,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.AMOUNT_DEBITED,
      updatedAmount,
    );
  });

  refundAmount = tryCatch(async (req: Request, res: Response) => {
    const accountId = req.params.accountId as string;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        AccountMessages.INVALID_AMOUNT,
        null,
      );
      return;
    }

    const refundedAmount = await this._accountUseCase.refund(accountId, amount);

    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.AMOUNT_REFUNDED,
      refundedAmount,
    );
  });

  verifyUserAccount = tryCatch(async (req: Request, res: Response) => {
    const accountNumber = req.body.accountNumber;

    if (!accountNumber) {
      createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        AccountMessages.ACCOUNT_NUMBER_REQUIRED,
        null,
      );
      return;
    }

    const accountId =
      await this._accountUseCase.verifyUserAccount(accountNumber);

    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      AccountMessages.ACCOUNT_VERIFIED,
      {
        accountId,
      },
    );
  });
}
