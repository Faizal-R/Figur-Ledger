export interface IAccountStatementResponseDTO {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
  };
  account: {
    accountNumber: string;
    type: string;
    ifsc: string;
    currency: string;
    balance: number;
    nickname: string;
  };
  summary: {
    beginningBalance: number;
    closingBalance: number;
    totalCredits: number;
    totalDebits: number;
    statementPeriod: string;
    totalPages: number;
    currentPage: number;
  };

  transactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
    entryType: "CREDIT" | "DEBIT";
    balance: number;
  }[];
}
