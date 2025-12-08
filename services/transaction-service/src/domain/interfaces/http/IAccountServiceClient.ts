export interface IAccountServiceClient {
  creditAccount({accountId,amount,transactionId}:{accountId: string, amount: number,transactionId?:string}): Promise<any>;
  debitAccount({accountId,amount,transactionId}:{accountId: string, amount: number,transactionId?:string}): Promise<any>;
   getBalance(accountId: string): Promise<number>;
   refund({accountId,amount,transactionId}:{accountId: string, amount: number,transactionId?:string}):Promise<any>
}
