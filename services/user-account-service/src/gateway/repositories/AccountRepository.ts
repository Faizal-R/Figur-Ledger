import { BaseRepository } from "./BaseRepository";
import { Account } from "../models/AccountModel";
import { IAccount } from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/interfaces/repositories/IAccountRepository";
import { injectable } from "inversify";
@injectable()
export class AccountRepository extends BaseRepository<IAccount> implements IAccountRepository{
    constructor(){
        super(Account);
    }
    getAccountsByUserId(userId:string):Promise<IAccount[]> {
        return this.model.find({userId}).exec();
    }


}