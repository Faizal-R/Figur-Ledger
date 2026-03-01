export interface ITransactionServiceClient {
   
    getTransactions(accountId: string,startDate:string,endDate:string):Promise<any>;
}