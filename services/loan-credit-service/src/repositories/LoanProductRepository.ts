import { ILoanProduct, LoanProduct } from "../models/LoanProduct";
import { BaseRepository } from "./BaseRepository";
import { ILoanProductRepository } from "./interfaces/ILoanProductRepository";
import { injectable } from "inversify";
@injectable()
export class LoanProductRepository extends BaseRepository<ILoanProduct> implements ILoanProductRepository {
    constructor() {
        super(LoanProduct);
    }
}  