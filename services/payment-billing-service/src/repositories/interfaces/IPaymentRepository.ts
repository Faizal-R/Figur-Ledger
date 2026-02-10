import { IPayment } from "../../models/Payment";
import { IBaseRepository } from "./IBaseRepository";

export interface IPaymentRepository extends IBaseRepository<IPayment>{
     getPaymentHistoryWithBillerDetails(userId:string):Promise<IPayment[]>
}