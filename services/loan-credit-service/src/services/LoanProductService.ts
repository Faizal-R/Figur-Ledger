import { inject, injectable } from "inversify";
import { ILoanProductRepository } from "../repositories/interfaces/ILoanProductRepository";
import { ILoanProductService } from "./interfaces/ILoanProductService";
import { DI_TOKENS } from "../di/types";
import { ILoanProduct } from "../models/LoanProduct";
import { ICreditProfileRepository } from "../repositories/interfaces/ICreditProfileRepository";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";

@injectable()
export class LoanProductService implements ILoanProductService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.LOAN_PRODUCT_REPOSITORY)
    private readonly _loanProductRepository: ILoanProductRepository,
    @inject(DI_TOKENS.REPOSITORIES.CREDIT_PROFILE_REPOSITORY)
    private readonly _creditProfileRepository: ICreditProfileRepository
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
 async getAllLoanProducts(userId?:string): Promise<ILoanProduct[]> {

   try {
    if(userId=='undefined'){
      
      const loanProducts = await this._loanProductRepository.find();
      return loanProducts;
    }
    
    const creditProfile = await this._creditProfileRepository.findOne({userId});
    if(!creditProfile){
      throw new CustomError("Credit profile not found",statusCodes.NOT_FOUND);
    }
    const loanProducts= await this._loanProductRepository.find({
      minCreditScore:{
        $gte:creditProfile.creditScore
      }
    });
    return loanProducts;
   } catch (error) {
    throw error;
   }
  }
}
