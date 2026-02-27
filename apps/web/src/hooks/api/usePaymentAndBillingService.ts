import { BillerService } from "@/services/api/BillerService";
import { PaymentService } from "@/services/api/PaymentService";
import { ISavedBiller } from "@/types/IBill";
import { IPayment } from "@/types/IPayment";
// import { IBiller } from "@/types/IBill";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBiller = () => {
  return useMutation({
    mutationFn: (data: {
      name: string;
      category: string;
      contactEmail: string;
      contactPhone: string;
    }) => {
      console.log("data", data);
      return BillerService.createBiller(data);
    },
  });
};
export const useGetAllBillers = (category: string) => {
  return useQuery({
    queryKey: ["billers", category],
    queryFn: () => BillerService.getBillers(category),
  });
};

export const useSaveBiller = () => {
  return useMutation({
    mutationFn: (data: Partial<ISavedBiller>) => {
      return BillerService.saveBiller(data);
    },
  });
};

export const useGetSavedBillers = (userId: string, category: string) => {
  return useQuery({
    queryKey: ["savedBillers", userId, category],
    queryFn: () => BillerService.getSavedBillers(userId, category),
  });
};

export const useGetBills = (
  category?: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["bills", category],
    queryFn: () => PaymentService.getBillDetails(category!),
    enabled: !!category && options?.enabled !== false,
    staleTime: 1000 * 30, 
    gcTime: 1000 * 60 * 5, // cache retention
    refetchOnWindowFocus: false,
  });
};



export const useInitiateBillPayment = () => {
  return useMutation({
    mutationFn: (paymentPayload:{paymentData: IPayment,billDetails:any}) => {
      return PaymentService.initiateBillPayment(paymentPayload);
    }
  });
}

export const useGetAllPayments = (userId: string,page:number=1) => {
  return useQuery({
    queryKey: ["payments", userId,page],
    queryFn: () => PaymentService.getPaymentHistory(userId,page),
    enabled: !!userId, 
  });
};
