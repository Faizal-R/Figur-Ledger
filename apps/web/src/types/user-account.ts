export interface IUser{
    id: string;
    fullName: string;
    email: string;
    phone: number | string;
    isActive: boolean;
    createdAt: string;
    role: string;
   
}




export interface IAccount {
  id?: string;
  userId: string; 
  accountNumber: string;
  accountType: "savings" | "current" | "credit";
  balance: number;
  currency: string;
  status: "active" | "frozen" | "closed";
  transactionCount?: number;
  lastTransactionAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
