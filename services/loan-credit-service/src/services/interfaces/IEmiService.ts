import { IRepaymentSchedule } from "../../models/RepaymentSchedule";

export interface IEmiService {
    processEmis(): Promise<void>;
    processSingleEmi(emi: IRepaymentSchedule): Promise<void>;
    getAllEmisByLoanApplicationId(loanApplicationId:string):Promise<IRepaymentSchedule[]>
}