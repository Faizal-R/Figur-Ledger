export interface ITransactionServiceClient {
  getTransactions(
    accountId: string,
    startDate: string,
    endDate: string,
    page?: number,
  ): Promise<any>;
}
