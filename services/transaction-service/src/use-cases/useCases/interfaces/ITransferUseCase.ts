export interface ITransferUseCase{
 execute(input: {
    senderAccountId: string;
    receiverAccountId: string;
    amount: number;
  }):Promise<any>
}