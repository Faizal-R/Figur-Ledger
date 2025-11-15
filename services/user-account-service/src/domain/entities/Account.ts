import { DateString } from "@figur-ledger/types";

export type AccountType = 'savings' | 'salary' | 'business'|'current';
export type AccountStatus = 'active' | 'frozen' | 'closed';

export class Account {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public accountNumber: string,
    public type: AccountType,
    public balance: number,
    public currency: string,
    public status: AccountStatus,
    public readonly nickname: string,
    public readonly ifsc: string,        
    public readonly interestRate?: number, 
    public readonly minBalance?: number,  
    public readonly createdAt?: DateString,
    public readonly updatedAt?: DateString
  ) {}
}
