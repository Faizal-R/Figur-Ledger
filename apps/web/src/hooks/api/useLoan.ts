import { LoanApplicationService, LoanEmiService, LoanProductService } from "@/services/api/LoanService";
import {  ILoanApplication, ILoanProduct } from "@/types/ILoan";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateLoanProduct = () => {
  return useMutation({
    mutationFn: (data: Partial<ILoanProduct>) =>{
        console.log("data",data)
        return LoanProductService.createLoanProduct(data)
    }
  });
};


export const useGetAllLoanProducts = (userId?:string) => {
  return useQuery({
    queryKey: ["loan-products",userId],
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

export const useGetAllLoanApplicationsByUserAndStatus = (userId:string,status:string) => {
  return useQuery({
    queryKey: ["loan-applications",userId,status],
    queryFn: () => LoanApplicationService.getAllLoanApplicationsByUserAndStatus(userId,status),
  });
};

export const useApproveOrRejectLoanApplication = () => {
  return useMutation({
    mutationFn: (data: { applicationId: string; status: "APPROVED" | "REJECTED"; approvedAmount?: number; approvedBy?: string }) => {
      console.log("data", data);
      return LoanApplicationService.approveOrRejectLoanApplication(data);
    },
  });
};


export const useGetAllLoanEmis = (applicationId:string) => {
  return useQuery({
    queryKey: ["loan-emis",applicationId],
    queryFn: () => LoanEmiService.getAllLoanEmis(applicationId),
  });
};
