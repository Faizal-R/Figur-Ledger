import { RabbitConsumer } from "@figur-ledger/messaging-sdk";
import { INotificationProvider } from "../../domain/interfaces/services/INotificationProvider";
import { injectable,inject } from "inversify";
interface UserRegisteredPayload {
  email: string;
  otp: string;
}
import {  TransactionEmailTemplate} from "../../infra/messaging/email/templates/transactionTemplate";
import { DI_TOKENS } from "../../di/types";
export type TransactionType = "CREDITED" | "DEBITED";
export interface TransactionNotificationMsg {
  debiterEmail: string;
  crediterEmail: string;
  amount: number;
  currency: "INR" | string;
  transactionId: string;
  date: Date | string;
}

@injectable()
export class TransactionCompletedConsumer {
  private readonly queue = "transaction.completed";

  constructor(
   @inject(DI_TOKENS.PROVIDERS.NOTIFICATION_PROVIDER) private readonly _notificationProvider:INotificationProvider
  ) {}

   async start() {
  await RabbitConsumer(this.queue, async (message: string) => {
    const data = JSON.parse(message) as TransactionNotificationMsg;
    const debitEmailTemplate = TransactionEmailTemplate.build({
      email: data.debiterEmail,
      amount: data.amount,
      currency: data.currency,
      transactionId: data.transactionId,
      date: data.date as string,
      type: "DEBITED",
    });

    const creditEmailTemplate = TransactionEmailTemplate.build({
      email: data.crediterEmail,
      amount: data.amount,
      currency: data.currency,
      transactionId: data.transactionId,
      date: data.date as string,
      type: "CREDITED",
    });

   
    await Promise.all([
      this._notificationProvider.sendEmail(debitEmailTemplate),
      this._notificationProvider.sendEmail(creditEmailTemplate),
    ]);

    console.log("Transaction emails sent (debit + credit)");
  });
}

}
