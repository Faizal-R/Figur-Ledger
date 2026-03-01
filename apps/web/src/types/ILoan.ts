export interface ILoanProduct {
  id?: string;
  _id?: string;
  code: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  minCreditScore: number;
  annualInterestRate: number;
  allowedTenuresInMonths: number[];
  isActive: boolean;
  processingTime?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoanApplication {
  id?: string;
  _id?: string;

  userId: string;

  loanProductId: string;

  requestedAmount: number;

  approvedAmount?: number;

  tenureInMonths: number;

  annualInterestRate: number;

  emiAmount?: number;
  totalPayableAmount?: number;

  status:
    | "APPLIED"
    | "APPROVED"
    | "DISBURSED"
    | "ACTIVE"
    | "CLOSED"
    | "REJECTED"
    | "DEFAULTED";

  approvedBy?: string;

  disbursedAt?: Date;
  closedAt?: Date;

  createdAt?: string;
}
