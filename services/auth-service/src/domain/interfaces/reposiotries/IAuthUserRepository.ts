
import {IBaseRepository} from "@figur-ledger/shared"
import { AuthUser } from "../../entities/AuthUser";

export interface IAuthUserRepository extends IBaseRepository<AuthUser>{
    findByEmail(email:string):Promise<AuthUser | null>;

}