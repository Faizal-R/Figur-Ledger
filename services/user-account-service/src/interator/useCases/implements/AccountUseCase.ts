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
    console.log("userId type:", typeof accountPayload.userId)
      const balance = 0;
      const accountNumber = generateNumbers(14);

      const account = new Account(
        '',
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
  getAccountsByUserId(userId: string): Promise<Account[]> {
    return this._accountRepository.getAccountsByUserId(userId);
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
}
