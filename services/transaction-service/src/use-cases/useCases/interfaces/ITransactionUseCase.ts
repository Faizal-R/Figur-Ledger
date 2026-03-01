import { Transaction } from "../../../domain/entities/Transaction";
import { ITransactionFilters } from "../../../types/ITransactionFilters";

export interface ITransactionUseCase {

   processDeposit(accountId: string, amount: number, referenceId: string): Promise<{ balance: number, txId: string }>;
   processWithdrawal(accountId: string, amount: number, referenceId: string): Promise<{ balance: number, txId: string }>;
   getTransactionHistory(accountId: string,page:number,filters?:ITransactionFilters): Promise<{transactions:Transaction[],totalPages:number}>;
}  