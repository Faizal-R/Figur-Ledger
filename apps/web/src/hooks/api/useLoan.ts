import {
  LoanApplicationService,
  LoanEmiService,
  LoanProductService,
} from "@/services/api/LoanService";
import { ILoanApplication, ILoanProduct } from "@/types/ILoan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLoanProduct = () => {
  return useMutation({
    mutationFn: (data: Partial<ILoanProduct>) => {
      console.log("data", data);
      return LoanProductService.createLoanProduct(data);
    },
  });
};

export const useGetAllLoanProducts = (userId?: string) => {
  return useQuery({
    queryKey: ["loan-products", userId],
    queryFn: () => LoanProductService.getAllLoanProducts(userId),
  });
};

export const useApplyLoan = () => {
  return useMutation({
    mutationFn: (data: Partial<ILoanApplication>) => {
      console.log("data", data);
      return LoanApplicationService.applyLoan(data);
    },
  });
};

export const useGetAllLoanApplications = () => {
  return useQuery({
    queryKey: ["loan-applications"],
    queryFn: () => LoanApplicationService.getAllLoanApplications(),
  });
};

export const useGetAllLoanApplicationsByUserAndStatus = (
  userId: string,
  status: string,
) => {
  return useQuery({
    queryKey: ["loan-applications", userId, status],
    queryFn: () =>
      LoanApplicationService.getAllLoanApplicationsByUserAndStatus(
        userId,
        status,
      ),
  });
};

export const useApproveOrRejectLoanApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LoanApplicationService.approveOrRejectLoanApplication,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["loan-applications"],
        exact: false,
      });

      toast.success(`Loan application ${variables.status} successfully`);
    },
  });
};

export const useGetAllLoanEmis = (applicationId: string) => {
  return useQuery({
    queryKey: ["loan-emis", applicationId],
    queryFn: () => LoanEmiService.getAllLoanEmis(applicationId),
  });
};
