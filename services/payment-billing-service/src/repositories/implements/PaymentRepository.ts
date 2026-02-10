import { injectable } from "inversify";
import { IPayment, Payment } from "../../models/Payment";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class PaymentRepository
  extends BaseRepository<IPayment>
  implements IPaymentRepository
{
  constructor() {
    super(Payment);
  }

  async getPaymentHistoryWithBillerDetails(userId: string):Promise<IPayment[]> {
    try {
      const paymentHistory = await this.model
        .find({ payerUserId: userId })
        .populate("payeeId")
        .sort({ createdAt: -1 });
      return paymentHistory;
    } catch (error) {
      throw error;
    }
  }
}
