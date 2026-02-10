import { injectable } from "inversify";
import axios from "./axiosInstance";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";

@injectable()
export class AccountServiceClient implements IAccountServiceClient {
  async creditAccount({accountId,amount}:{accountId: string, amount: number}) {
    const res = await axios.patch(`/accounts/${accountId}/credit`, { amount });
    return res.data.data;
  }

  async debitAccount({accountId,amount}:{accountId: string, amount: number}) {
    const res = await axios.patch(`/accounts/${accountId}/debit`, { amount });
    return res.data.data;
  }
  async getBalance(accountId: string): Promise<number> {
    const res = await axios.get(`/accounts/${accountId}/balance`);
    return res.data.balance;
  }
 async refund({ accountId, amount, transactionId }: { accountId: string; amount: number; transactionId?: string; }): Promise<any> {
      const res = await axios.patch(`/accounts/${accountId}/refund`, { amount,transactionId });
    return res.data;
  }
}
