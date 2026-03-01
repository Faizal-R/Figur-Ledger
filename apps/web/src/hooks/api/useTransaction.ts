import { ITransactionFilters } from "@/components/features/customer/transactions/TransactionCard";
import { TransactionService } from "@/services/api/TransactionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useTransactionHistory = (
  accountId: string,
  page: number = 1,
  filters: ITransactionFilters,
) => {
  return useQuery({
    queryKey: ["transaction-history", accountId, page, filters],
    queryFn: async () => {
      return await TransactionService.getTransactionHistory(
        accountId,
        page,
        filters,
      );
    },
    enabled: !!accountId,
  });
};

export const useTransferAmount = () => {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAccounts"] ,exact:false});
      toast.success("Transfer completed successfully");
    },
    onError: (err: any) => {
      toast.error("Transfer failed: " + (err.message || "Unknown error"));
    },
  });
};
