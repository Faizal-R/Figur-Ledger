
export interface ITransactionUseCase {
    verifyPayment(orderId:string,paymentId:string,signature:string,txId:string):Promise<any>
   processDeposit(accountId: string, amount: number): Promise<
  { orderId: string; amount: number; txId: string }>
}