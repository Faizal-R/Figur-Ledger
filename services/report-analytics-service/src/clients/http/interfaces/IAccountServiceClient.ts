export interface IAccountServiceClient {
  getAccountDetailsById(accountId: string): Promise<any>;
}