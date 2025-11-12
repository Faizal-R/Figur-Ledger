import { IAccount } from "../../../domain/entities/Account";

export interface IAccountUseCase{
    createAccount(accountPayload:Partial<IAccount>):Promise<IAccount>
    updateAccount(accountId:string,accountPayload:Partial<IAccount>):Promise<IAccount|null>
    // deleteAccount(accountId:string):Promise<IAccount>
    // getAccountById(accountId:string):Promise<IAccount>
    getAccountsByUserId(userId:string):Promise<IAccount[]>


}