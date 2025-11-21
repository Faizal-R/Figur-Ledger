export interface IRazorpayClient {
  createOrder(amount: number): Promise<any>;
  verifySignature(orderId: string, paymentId: string, signature: string): boolean;
  fetchPayment(paymentId: string): Promise<any>;
}
