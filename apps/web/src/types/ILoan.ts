export interface ILoanProduct {
  id?: string;

  code: string;

  name: string;

  minAmount: number;
  maxAmount: number;
  minCreditScore:number;
  annualInterestRate: number;

  allowedTenuresInMonths: Array<3 | 6 | 9>;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface ILoanApplication {
  id?: string;

  userId: string;

  loanProductId: string;

  requestedAmount: number;

  approvedAmount?: number;

  tenureInMonths: 3 | 6 | 9;

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
