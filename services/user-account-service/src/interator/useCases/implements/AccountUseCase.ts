import { inject, injectable } from "inversify";
import { Account } from "../../../domain/entities/Account";
import { IAccountUseCase } from "../interfaces/IAccountUseCase";
import { IAccountRepository } from "../../../domain/interfaces/repositories/IAccountRepository";
import { DI_TOKENS } from "../../../di/types";
import { CreateAccountRequestDTO } from "../../dto/request/CreateAccountRequestDTO";
import { generateNumbers } from "../../utils/generateRandomNumbers";
import crypto from "crypto";
import {
  accountStatus,
  accountType,
  currency,
  DEFAULT_IFSC,
} from "../../constant/account";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { AccountMessages } from "../../../interfaces/controllers/implements/AccountMessages";

@injectable()
export class AccountUseCase implements IAccountUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountRepository,
    @inject(DI_TOKENS.REPOSITORIES.USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}
  async createAccount(
    accountPayload: CreateAccountRequestDTO,
  ): Promise<Account> {
    try {
      console.log("accountPayload userId:", accountPayload.userId);
      console.log("userId type:", typeof accountPayload.userId);
      const balance = 0;
      const accountNumber = generateNumbers(14);

      const account = new Account(
        "",
        accountPayload.userId,
        accountNumber,
        accountPayload.type,
        balance,
        currency.INR,
        accountStatus.ACTIVE,
        accountPayload.nickname,
        DEFAULT_IFSC,
      );
      console.log(account);
      const createdAccount = await this._accountRepository.create(account);
      return createdAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }
  // deleteAccount(id: string): Promise<void> {
  //     throw new Error("Method not implemented.");
  // }
  async getAccountsByUserId(userId: string): Promise<Account[]> {
    try {
      if (!userId) {
        throw new Error(AccountMessages.USER_ID_REQUIRED);
      }

      const accounts =
        await this._accountRepository.getAccountsByUserId(userId);
      console.log("Fetched accounts for userId", { userId, accounts });
      return accounts ?? [];
    } catch (error) {
      console.error("Failed to fetch accounts for userId", {
        userId,
        error,
      });

      throw error instanceof CustomError
        ? error
        : new CustomError(
            AccountMessages.FETCH_ACCOUNTS_FAILED,
            statusCodes.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async updateAccount(
    accountId: string,
    accountPayload: Partial<Account>,
  ): Promise<Account | null> {
    const updatedAccount = await this._accountRepository.update(
      accountId,
      accountPayload,
    );
    return updatedAccount;
  }

  async amountCredited(
    accountId: string,
    amount: number,
    transactionId?: string,
  ): Promise<{ balance: number; creditedUserEmail: string }> {
    const account = await this._accountRepository.findById(accountId);
    if (!account) {
      throw new CustomError(
        AccountMessages.ACCOUNT_NOT_FOUND,
        statusCodes.NOT_FOUND,
      );
    }

    const newBalance = account.balance + amount;

    const updatedAccount = await this._accountRepository.update(accountId, {
      balance: newBalance,
    });

    if (!updatedAccount) {
      throw new CustomError(
        AccountMessages.UPDATE_BALANCE_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const creditedUser = await this._userRepository.findOne({
      authUserId: updatedAccount.userId,
    });

    console.log(creditedUser);
    console.log("Credit applied", {
      accountId,
      transactionId,
      amount,
    });

    return {
      balance: updatedAccount.balance,
      creditedUserEmail: creditedUser?.email!,
    };
  }

  async amountDebited(
    accountId: string,
    amount: number,
    transactionId?: string,
  ): Promise<{ balance: number; debitedUserEmail: string }> {
    const account = await this._accountRepository.findById(accountId);
    if (!account) {
      throw new CustomError(
        AccountMessages.ACCOUNT_NOT_FOUND,
        statusCodes.NOT_FOUND,
      );
    }

    if (account.balance < amount) {
      throw new CustomError(
        AccountMessages.INSUFFICIENT_BALANCE,
        statusCodes.BAD_REQUEST,
      );
    }

    const newBalance = account.balance - amount;

    const updatedAccount = await this._accountRepository.update(accountId, {
      balance: newBalance,
    });

    if (!updatedAccount) {
      throw new CustomError(
        AccountMessages.UPDATE_BALANCE_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const debitedUser = await this._userRepository.findOne({
      authUserId: updatedAccount.userId,
    });
    console.log("debitedUser", debitedUser);
    console.log("Debit applied", {
      accountId,
      transactionId,
      amount,
    });

    return {
      balance: updatedAccount.balance,
      debitedUserEmail: debitedUser?.email!,
    };
  }

  async refund(
    accountId: string,
    amount: number,
    transactionId?: string,
  ): Promise<{ balance: number }> {
    return this.amountCredited(accountId, amount, transactionId);
  }

  async verifyUserAccount(
    accountNumber: number,
  ): Promise<{ accountId: string }> {
    try {
      if (!accountNumber) {
        throw new CustomError(
          AccountMessages.ACCOUNT_NUMBER_REQUIRED,
          statusCodes.BAD_REQUEST,
        );
      }

      const account = await this._accountRepository.findOne({
        accountNumber,
      });

      if (!account) {
        throw new CustomError(
          AccountMessages.INVALID_ACCOUNT_NUMBER,
          statusCodes.NOT_FOUND,
        );
      }

      // if (account.status !== accountStatus.ACTIVE) {
      //   throw new CustomError(
      //     "Account is not active",
      //     statusCodes.BAD_REQUEST
      //   );
      // }

      return {
        accountId: account.id,
      };
    } catch (error) {
      console.error("Verify account failed", { accountNumber, error });

      throw error instanceof CustomError
        ? error
        : new CustomError(
            AccountMessages.VERIFY_ACCOUNT_FAILED,
            statusCodes.INTERNAL_SERVER_ERROR,
          );
    }
  }
  async getAccountDetailsById(accountId: string): Promise<Account | null> {
    try {
      const account = await this._accountRepository.findById(accountId);
      return account;
    } catch (error) {
      console.error("Failed to fetch account details", { accountId, error });
      throw error instanceof CustomError
        ? error
        : new CustomError(
            AccountMessages.FETCH_ACCOUNT_DETAILS_FAILED,
            statusCodes.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
