import { IPayment } from "../../models/Payment";

export interface IPaymentService{
    initiateBillPayment(paymentData: IPayment,billDetails:any): Promise<IPayment|null>;
    getPaymentHistory(userId:string,page:number):Promise<{payments:IPayment[],totalPages:number}>
}