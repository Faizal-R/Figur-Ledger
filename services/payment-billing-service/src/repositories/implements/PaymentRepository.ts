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

  async getPaymentHistoryWithBillerDetails(
    userId: string,
    page: number,
  ): Promise<{ payments: IPayment[]; totalPages: number }> {
    try {
      const skip = (page - 1) * 10;
      const paymentHistory = await this.model
        .find({ payerUserId: userId })
        .populate("payeeId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(10);
      const totalPayments = await this.model.countDocuments({
        payerUserId: userId,
      });
      const totalPages = Math.ceil(totalPayments / 10);
      return { payments: paymentHistory, totalPages };
    } catch (error) {
      throw error;
    }
  }
}
