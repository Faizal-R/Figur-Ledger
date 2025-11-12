import { IAccount } from "../../entities/Account";
import { IBaseRepository } from "./IBaseRepository";

export interface IAccountRepository extends IBaseRepository<IAccount> {
 getAccountsByUserId(userId:string):Promise<IAccount[]>
}