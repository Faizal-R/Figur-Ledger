import { ILoanProduct } from "../../models/LoanProduct";

export interface ILoanProductService {
    createLoanProduct(payload:Partial<ILoanProduct>): Promise<ILoanProduct>;
    updateLoanProduct(payload:Partial<ILoanProduct>): Promise<ILoanProduct|null>;
    getAllLoanProducts(): Promise<ILoanProduct[]>;
}