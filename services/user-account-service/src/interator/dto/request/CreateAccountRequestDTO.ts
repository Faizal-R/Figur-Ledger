import { AccountType } from "../../../domain/entities/Account";

export interface CreateAccountRequestDTO{
    userId:string;
    nickname:string;
    currency:string;
    type:AccountType
    
}