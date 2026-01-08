import { ILoanApplication } from "../../models/LoanApplication";

export interface ILoanApplicationService{  createLoanApplication(payload: Partial<ILoanApplication>): Promise<ILoanApplication>;
    getAllLoanApplications(): Promise<ILoanApplication[]>;
    approveOrRejectLoanApplication(payload: {
        applicationId: string;
        status: "APPROVED" | "REJECTED";
        approvedAmount?: number;
        approvedBy?: string;
    }): Promise<ILoanApplication | null>;
}