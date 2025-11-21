export interface IAccountServiceClient {
  creditAccount(accountId: string, amount: number): Promise<any>;
  debitAccount(accountId: string, amount: number): Promise<any>;
}
