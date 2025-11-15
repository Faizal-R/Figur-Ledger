import { IBaseRepository } from "@figur-ledger/shared";
import { Account } from "../../entities/Account";


export interface IAccountRepository extends IBaseRepository<Account> {
 getAccountsByUserId(userId:string):Promise<Account[]>
}