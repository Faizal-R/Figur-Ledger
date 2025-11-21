import { injectable } from "inversify";
import axios from "./axiosInstance";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";

@injectable()
export class AccountServiceClient implements IAccountServiceClient {
  async creditAccount(accountId: string, amount: number) {
    const res = await axios.patch(`/accounts/${accountId}/credit`, { amount });
    return res.data;
  }

  async debitAccount(accountId: string, amount: number) {
    const res = await axios.post(`/accounts/${accountId}/debit`, { amount });
    return res.data;
  }
}
