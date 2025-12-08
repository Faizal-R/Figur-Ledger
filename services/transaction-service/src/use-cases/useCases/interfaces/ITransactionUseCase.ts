import { Transaction } from "../../../domain/entities/Transaction";

export interface ITransactionUseCase {

   processDeposit(accountId: string, amount: number, referenceId: string): Promise<{ balance: number, txId: string }>;
   processWithdrawal(accountId: string, amount: number, referenceId: string): Promise<{ balance: number, txId: string }>;
   getMoney(accountId: string, amount: number, referenceId: string): Promise<{ balance: number; txId: string }>;
   getTransactionHistory(userId: string): Promise<Transaction[]>;
}