export interface ITransactionServiceClient {
    transfer(senderAccountId: string, receiverAccountId: string, amount: number): Promise<{
        data:{
            id:string
        }
    }>;
}