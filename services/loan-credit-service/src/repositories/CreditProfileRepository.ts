// import { BaseRepository, IBaseRepository } from "@figur-ledger/shared";
import { ICreditProfileRepository } from "./interfaces/ICreditProfileRepository";
import { ICreditProfile,CreditProfile} from "../models/CreditProfile";
import { BaseRepository } from "./BaseRepository";
import { injectable } from "inversify";



@injectable()
export class CreditProfileRepository extends BaseRepository<ICreditProfile>implements ICreditProfileRepository {
    constructor() {
        super(CreditProfile);
    }
}