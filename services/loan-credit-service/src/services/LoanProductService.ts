import { inject, injectable } from "inversify";
import { ILoanProductRepository } from "../repositories/interfaces/ILoanProductRepository";
import { ILoanProductService } from "./interfaces/ILoanProductService";
import { DI_TOKENS } from "../di/types";
import { ILoanProduct } from "../models/LoanProduct";

@injectable()
export class LoanProductService implements ILoanProductService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.LOAN_PRODUCT_REPOSITORY)
    private readonly _loanProductRepository: ILoanProductRepository
  ) {}

 async createLoanProduct(payload: Partial<ILoanProduct>): Promise<ILoanProduct> {
   try {
       const loanProduct = await this._loanProductRepository.create(payload);
       return loanProduct;
    
   } catch (error) {
     throw error;
   }
  }
  async updateLoanProduct(payload: Partial<ILoanProduct>): Promise<ILoanProduct|null> {
    
    const updatedLoanProduct = await this._loanProductRepository.update(payload.id,payload);
    return updatedLoanProduct;
  }
  getAllLoanProducts(): Promise<ILoanProduct[]> {
    return this._loanProductRepository.find();
  }
}
