import { IBaseRepository } from "./IBaseRepository";
import { IRepaymentSchedule } from "../../models/RepaymentSchedule";
export interface IRepaymentScheduleRepository extends IBaseRepository<IRepaymentSchedule> {
//   findByLoanId(loanId: string): Promise<IRepaymentSchedule[]>;  
insertMany(docs:Partial<IRepaymentSchedule>[]): Promise<IRepaymentSchedule[]>
}
