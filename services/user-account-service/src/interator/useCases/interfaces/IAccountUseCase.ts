import { Account } from "../../../domain/entities/Account";

export interface IAccountUseCase {
  createAccount(accountPayload: Partial<Account>): Promise<Account>;
  updateAccount(
    accountId: string,
    accountPayload: Partial<Account>
  ): Promise<Account | null>;
  getAccountsByUserId(userId: string): Promise<Account[]>;
  amountCredited(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number,creditedUserEmail:string }>;
  amountDebited(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number,debitedUserEmail:string }>;
  refund(
    accountId: string,
    amount: number,
    transactionId?: string
  ): Promise<{ balance: number }>;

  verifyUserAccount(accountNumber:number):Promise<{accountId:string} >
}
