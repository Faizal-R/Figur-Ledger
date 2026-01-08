import request from "@/config/client";
import { httpMethods } from "@/constant/api/enums/api";
import { LoanRoutes } from "@/constant/api/routes/LoanRoutes";
import { ApiResponse } from "@/types/api";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { ILoanApplication, ILoanProduct } from "@/types/ILoan";

export const LoanProductService = {
  async createLoanProduct(
    data: Partial<ILoanProduct>
  ): Promise<ApiResponse<ILoanProduct>> {
    try {
      console.log("data:service",data)
      return await request<ApiResponse<ILoanProduct>>(
        httpMethods.POST,
        LoanRoutes.LoanProductRoutes.CREATE,
        {loanProduct:data}
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to create loan product");
    }
  },
  async getAllLoanProducts():Promise<ApiResponse<ILoanProduct[]>>{
    try {
      return await request<ApiResponse<ILoanProduct[]>>(
        httpMethods.GET,
        LoanRoutes.LoanProductRoutes.GET_ALL
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to get all loan products");
    }
  }
};




export const LoanApplicationService={
  async applyLoan(data:Partial<ILoanApplication>):Promise<ApiResponse<ILoanApplication>>{
    try {
      return await request<ApiResponse<ILoanApplication>>(
        httpMethods.POST,
        LoanRoutes.LoanApplicationRoutes.APPLY,
        {loanApplication:data}
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to create loan application");
    }
  },
 async getAllLoanApplications():Promise<ApiResponse<ILoanApplication[]>>{
    try {
      return await request<ApiResponse<ILoanApplication[]>>(
        httpMethods.GET,
        LoanRoutes.LoanApplicationRoutes.GET_ALL
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to get all loan applications");
    }
  },

  async approveOrRejectLoanApplication(data:{applicationId:string,status:"APPROVED"|"REJECTED",approvedAmount?:number,approvedBy?:string}):Promise<ApiResponse<ILoanApplication>>{
    try {
      console.log("data:service",data)
      return await request<ApiResponse<ILoanApplication>>(
        httpMethods.PUT,
        LoanRoutes.LoanApplicationRoutes.APPROVE_OR_REJECT,
        {applicationData:data}
      );
    } catch (error) {
      throw parseAxiosError(error, "Failed to approve or reject loan application");
    }
  }
}


