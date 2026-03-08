import { IBaseRepository } from "./IBaseRepository";


import { ILoanApplication } from "../../models/LoanApplication";

export interface ILoanApplicationRepository extends IBaseRepository<ILoanApplication> {
  getLoanStats(): Promise<{
    totalLoans: number;
    health: { name: string; value: number }[];
    productPerformance: { name: string; count: number; volume: number }[];
  }>;
}
