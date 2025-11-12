import { inject, injectable } from "inversify";
import { IAccount } from "../../../domain/entities/Account";
import { IAccountUseCase } from "../interfaces/IAccountUseCase";
import { IAccountRepository } from "../../../domain/interfaces/repositories/IAccountRepository";
import { DI_TOKENS } from "../../../di/types";

@injectable()
export class AccountUseCase implements IAccountUseCase {  
    constructor(@inject(DI_TOKENS.REPOSITORIES.ACCOUNT_REPOSITORY) private readonly _accountRepository: IAccountRepository){}
    async createAccount(accountPayload: Partial<IAccount>): Promise<IAccount> {
     try {
         const createdAccount = await this._accountRepository.create(accountPayload);
         return createdAccount;
     } catch (error) {
        console.error("Error creating account:", error);
        throw error;
     }
    
    }
    // deleteAccount(id: string): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }
    getAccountsByUserId(userId: string): Promise<IAccount[]> {
        return this._accountRepository.getAccountsByUserId(userId);
    }
   async updateAccount(accountId: string, accountPayload: Partial<IAccount>): Promise<IAccount|null> {
        const updatedAccount= await this._accountRepository.update(accountId,accountPayload);
        return updatedAccount;
    
    }


}