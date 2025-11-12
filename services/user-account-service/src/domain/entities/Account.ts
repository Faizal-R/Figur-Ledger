export type AccountType = 'savings' | 'checking' | 'business';
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
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
