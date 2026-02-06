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

@injectable()
export class AccountUseCase implements IAccountUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountRepository
  ) {}
  async createAccount(
    accountPayload: CreateAccountRequestDTO
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
        DEFAULT_IFSC
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
        throw new Error("userId is required");
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
            "Unknown error occurred while fetching accounts",
            statusCodes.INTERNAL_SERVER_ERROR
          );
    }
  }

  async updateAccount(
    accountId: string,
    accountPayload: Partial<Account>
  ): Promise<Account | null> {
    const updatedAccount = await this._accountRepository.update(
      accountId,
      accountPayload
    );
    return updatedAccount;
  }

 async amountCredited(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number }> {
    const account = await this._accountRepository.findById(accountId);
    if (!account) {
      throw new CustomError("Account not found", statusCodes.NOT_FOUND);
    }

    const newBalance = account.balance + amount;

    const updatedAccount = await this._accountRepository.update(accountId, {
      balance: newBalance,
    });

    if (!updatedAccount) {
      throw new CustomError(
        "Failed to update account balance",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }

    
    console.log("Credit applied", {
      accountId,
      transactionId,
      amount,
    });

    return { balance: updatedAccount.balance };
  }

  async amountDebited(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number }> {
    const account = await this._accountRepository.findById(accountId);
    if (!account) {
      throw new CustomError("Account not found", statusCodes.NOT_FOUND);
    }

    if (account.balance < amount) {
      throw new CustomError("Insufficient balance", statusCodes.BAD_REQUEST);
    }

    const newBalance = account.balance - amount;

    const updatedAccount = await this._accountRepository.update(accountId, {
      balance: newBalance,
    });

    if (!updatedAccount) {
      throw new CustomError(
        "Failed to update account balance",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }

    console.log("Debit applied", {
      accountId,
      transactionId,
      amount,
    });

    return { balance: updatedAccount.balance };
  }


  async refund(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number }> {
    return this.amountCredited(accountId, amount, transactionId);
  }


async verifyUserAccount(accountNumber: number): Promise<{accountId:string}> {
  try {
    if (!accountNumber) {
      throw new CustomError(
        "Account number is required",
        statusCodes.BAD_REQUEST
      );
    }

    const account = await this._accountRepository.findOne(
      {
        accountNumber
      }
      
    );

    if (!account) {
      throw new CustomError(
        "Invalid account number",
        statusCodes.NOT_FOUND
      );
    }

    // if (account.status !== accountStatus.ACTIVE) {
    //   throw new CustomError(
    //     "Account is not active",
    //     statusCodes.BAD_REQUEST
    //   );
    // }

    // ✅ SECURITY: Do NOT expose balance in verification
  return {
    accountId:account.id
  }
  } catch (error) {
    console.error("Verify account failed", { accountNumber, error });

    throw error instanceof CustomError
      ? error
      : new CustomError(
          "Failed to verify account",
          statusCodes.INTERNAL_SERVER_ERROR
        );
  }
}


}
