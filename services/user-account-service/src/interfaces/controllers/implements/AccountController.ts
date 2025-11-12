import { inject, injectable } from "inversify";
import { IAccountController } from "../interfaces/IAccountController";
import { DI_TOKENS } from "../../../di/types";
import { IAccountUseCase } from "../../../interator/useCases/interfaces/IAccountUseCase";
import { IAccount } from "../../../domain/entities/Account";
import { Request, Response } from "express";
import { tryCatch } from "../../../../../../packages/handlers/src/tryCatch/tryCatch";
import { AccountSchema } from "../../validations/account/AccountSchema";
import { createResponse } from "../../../helpers/handlers/response";
import { HTTP_STATUS_CODE } from "../../../domain/enums/HttpStatusCodes";
@injectable()
export class AccountController implements IAccountController {
  constructor(
    @inject(DI_TOKENS.USECASES.ACCOUNT_USECASE)
    private readonly _accountUseCase: IAccountUseCase
  ) {}

  createAccount = tryCatch(async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const accountPayload = req.body;
    const validatedAccountPayload = AccountSchema.safeParse(accountPayload);
    if (!validatedAccountPayload.success) {
      createResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        false,
        validatedAccountPayload.error.issues[0].message,
        null
      );
      return;
    }

    const createdAccount = await this._accountUseCase.createAccount({
      ...validatedAccountPayload.data,
      userId,
    });
    createResponse(
      res,
      HTTP_STATUS_CODE.CREATED,
      true,
      "Account opened successfully",
      createdAccount
    );
  });
    updateAccount = tryCatch(async (req: Request, res: Response) => {
      const accountId = req.params.accountId as string;
      const accountPayload = req.body;
      const validatedAccountPayload = AccountSchema.safeParse(accountPayload);
      if (!validatedAccountPayload.success) {
        createResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          false,
          validatedAccountPayload.error.issues[0].message,
          null
        );
        return;
      }
      const updatedAccount = await this._accountUseCase.updateAccount(accountId,validatedAccountPayload.data);
        createResponse(
          res,
          HTTP_STATUS_CODE.SUCCESS,
          true,
          "Account updated successfully",
          updatedAccount
        );
    });

  getAccountsByUserId = tryCatch(async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (!userId) {
      createResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        false,
        "User Id is required",
        null
      );
      return;
    }

    
    const accounts = await this._accountUseCase.getAccountsByUserId(userId);
    createResponse(
      res,
      HTTP_STATUS_CODE.SUCCESS,
      true,
      "Accounts fetched successfully",
       accounts
    );
  });
}
