import { injectable, inject } from "inversify";
import { IPayment } from "../../models/Payment";
import { IPaymentService } from "../interfaces/IPaymentService";
import { DI_TOKENS } from "../../di/types";
import { IPaymentRepository } from "../../repositories/interfaces/IPaymentRepository";
import { ITransactionServiceClient } from "../../config/http/interfaces/ITransactionServiceClient";
import { IInvoiceRepository } from "../../repositories/interfaces/IInvoiceRepository";

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.PAYMENT_REPOSITORY)
    private _paymentRepository: IPaymentRepository,
    @inject(DI_TOKENS.CLIENTS.TRANSACTION_SERVICE_CLIENT)
    private _transactionClientService: ITransactionServiceClient,
    @inject(DI_TOKENS.REPOSITORIES.INVOICE_REPOSITORY)
    private _invoiceRepository: IInvoiceRepository,
  ) {}
  async initiateBillPayment(
    paymentData: IPayment,
    billDetails: any,
  ): Promise<IPayment | null> {
    let createdPayment: IPayment | null = null;
    let createdInvoice: any = null;
    try {
        console.log(billDetails)
      createdInvoice = await this._invoiceRepository.create({
        billNumber: billDetails.billNumber,
        billerId: paymentData.payeeId,
        savedBillerId: billDetails.savedBillerId,
        payerUserId:paymentData.payerUserId,
        payerAccountId: paymentData.payerAccountId,
        totalAmount: billDetails.totalAmount,
        dueDate: new Date(billDetails.dueDate),
        breakdown: billDetails.breakdown,
        status: "PROCESSING",
      });
    console.log("invoice created",createdInvoice)
      createdPayment = await this._paymentRepository.create(paymentData);

      const transactioinResponse =
        await this._transactionClientService.transfer(
          createdPayment.payerAccountId,
          createdPayment.payeeAccountId!,
          createdPayment.amount,
        );
      console.log("TransactionResponse: ", transactioinResponse);



      const updatedPayment = await this._paymentRepository.update(
        String(createdPayment._id),
        {
          status: "SUCCESS",
          settled: true,
          completedAt: new Date(),
          settledAt: new Date(),
          transactionId: transactioinResponse.data.id,
        },
      );
      await this._invoiceRepository.update(createdInvoice._id, {
        status: "PAID",
      });

      return updatedPayment;
    } catch (error) {
      console.log("[Error Occurred While InitiateBill]", error);

      if (createdPayment?._id) {
        await this._paymentRepository.update(String(createdPayment._id), {
          status: "FAILED",
          settled: false,
          failedAt: new Date(),
        });
      }

      if (createdInvoice?._id) {
        await this._invoiceRepository.update(createdInvoice._id, {
          status: "FAILED",
        });
      }

      throw error;
    }
  }

  async getPaymentHistory(userId: string): Promise<IPayment[]> {
    try {
      const paymentHistory =
        await this._paymentRepository.getPaymentHistoryWithBillerDetails(
          userId,
        );
        console.log(paymentHistory)
      return paymentHistory;
    } catch (error) {
      throw error;
    }
  }
}
