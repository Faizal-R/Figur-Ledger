import { RabbitConsumer } from "@figur-ledger/messaging-sdk";
import { INotificationProvider } from "../../domain/services/INotificationProvider";
import { injectable,inject } from "inversify";
interface UserRegisteredPayload {
  email: string;
  otp: string;
}
import { VerificationEmailTemplate } from "../../infra/messaging/email/templates/verificationTemplate";
import { DI_TOKENS } from "../../di/types";

@injectable()
export class UserRegisteredConsumer {
  private readonly queue = "user.registered";

  constructor(
   @inject(DI_TOKENS.PROVIDERS.NOTIFICATION_PROVIDER) private readonly _notificationProvider:INotificationProvider
  ) {}

   async start() {
    await RabbitConsumer(this.queue, async (message: string) => {
       
      const data = JSON.parse(message) as UserRegisteredPayload;
      const template=VerificationEmailTemplate.build
      (data.email,data.otp)
      await this._notificationProvider.sendEmail(template);
      console.log("EmailSended")
    });
  }
}
