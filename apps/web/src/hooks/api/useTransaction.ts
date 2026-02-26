import { ITransactionFilters } from "@/components/features/customer/transactions/TransactionCard";
import { TransactionService } from "@/services/api/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProcessDeposit = () => {
  return useMutation({
    mutationFn: ({
      accountId,
      amount,
      referenceId,
    }: {
      accountId: string;
      referenceId: string;
      amount: number;
    }) => TransactionService.processDeposit(accountId, amount, referenceId),
  });
};
export const useProcessWithdrawal = () => {
  return useMutation({
    mutationFn: ({
      accountId,
      amount,
      referenceId,
    }: {
      accountId: string;
      referenceId: string;
      amount: number;
    }) => TransactionService.processWithdrawal(accountId, referenceId, amount),
  });
};

export const useTransactionHistory = (accountId: string, page: number = 1,filters:ITransactionFilters) => {
  return useQuery({
    queryKey: ["transaction-history", accountId, page,filters],
    queryFn: async () => {
      return await TransactionService.getTransactionHistory(accountId, page,filters);
    },
    enabled: !!accountId,
  });
};

export const useTransferAmount = () => {
  return useMutation({
    mutationFn: async ({
      senderAccountId,
      receiverAccountId,
      amount,
    }: {
      senderAccountId: string;
      receiverAccountId: string;
      amount: number;
    }) => {
      return TransactionService.TransferAmount(
        senderAccountId,
        receiverAccountId,
        amount,
      );
    },
  });
};
