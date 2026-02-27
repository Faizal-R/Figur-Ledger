import { RabbitConsumer } from "@figur-ledger/messaging-sdk";
import { injectable, inject } from "inversify";
import { INotificationProvider } from "../../domain/interfaces/services/INotificationProvider";
import { DI_TOKENS } from "../../di/types";
import { LoanStatusEmailTemplate } from "../../infra/messaging/email/templates/LoanStatus";
import { IUserServiceClient } from "../../domain/interfaces/http/IUserServiceClient";

export type LoanStatusType = "APPROVED" | "REJECTED";

export interface LoanStatusNotificationMsg {
 userId:string;

  loanApplicationId: string;

  requestedAmount: number;
  approvedAmount?: number;

  tenureInMonths: number;
  annualInterestRate: number;

  emiAmount?: number;
  totalPayableAmount?: number;

  rejectionReason?: string;

  currency: "INR" | string;
  date: Date | string;

  type: LoanStatusType;
}

@injectable()
export class LoanStatusUpdateConsumer {
  private readonly queue = "loan.status.updated";

  constructor(
    @inject(DI_TOKENS.PROVIDERS.NOTIFICATION_PROVIDER)
    private readonly _notificationProvider: INotificationProvider,
    @inject(DI_TOKENS.CLIENT.USER_SERVICE_CLIENT) 
    private readonly _userServiceClient:IUserServiceClient
  ) {}

  async start() {
    await RabbitConsumer(this.queue, async (message: string) => {
      const data = JSON.parse(message) as LoanStatusNotificationMsg;
       const userData=await this._userServiceClient.getUserDetails(data.userId)
       console.log(userData)
      const emailTemplate = LoanStatusEmailTemplate.build({
        email: userData.userEmail,
        customerName: userData.userName,
        loanApplicationId: data.loanApplicationId,
        requestedAmount: data.requestedAmount,
        approvedAmount: data.approvedAmount,
        tenureInMonths: data.tenureInMonths,
        annualInterestRate: data.annualInterestRate,
        emiAmount: data.emiAmount,
        totalPayableAmount: data.totalPayableAmount,
        rejectionReason: data.rejectionReason,
        currency: data.currency,
        date: data.date as string,
        type: data.type,
      });

      await this._notificationProvider.sendEmail(emailTemplate);

      console.log(`Loan status email sent -> ${data.type}`);
    });
  }
}
