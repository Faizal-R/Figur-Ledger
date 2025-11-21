import { TransactionService } from "@/services/api/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProcessDeposit = () => {
  return useMutation({
    mutationFn: ({accountId, amount}:{accountId:string,amount:number}) =>
      TransactionService.processDeposit(accountId, amount)
  });
};
export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: ({orderId, paymentId, signature,txId}:{orderId:string,paymentId:string,signature:string,txId:string}) =>
      TransactionService.verifyPayment(orderId, paymentId, signature,txId)
  });
}