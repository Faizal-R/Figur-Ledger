import { Account } from "../../../domain/entities/Account";

export interface IAccountUseCase{
    createAccount(accountPayload:Partial<Account>):Promise<Account>
    updateAccount(accountId:string,accountPayload:Partial<Account>):Promise<Account|null>
    // deleteAccount(accountId:string):Promise<Account>
    // getAccountById(accountId:string):Promise<Account>
    getAccountsByUserId(userId:string):Promise<Account[]>
    amountCredited(accountId:string,amount:number):Promise<{updatedAmount:number}>


}