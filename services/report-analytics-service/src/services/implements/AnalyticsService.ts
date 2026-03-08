import { inject, injectable } from "inversify";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { DI_TOKENS } from "../../di/types";
import { ILoanServiceClient } from "../../clients/http/interfaces/ILoanServiceClient";
import { IBillingServiceClient } from "../../clients/http/interfaces/IBillingServiceClient";
import { ITransactionServiceClient } from "../../clients/http/interfaces/ITransactionServiceClient";
import { IUserServiceClient } from "../../clients/http/interfaces/IUserServiceClient";

@injectable()
export class AnalyticsService implements IAnalyticsService {
  constructor(
    @inject(DI_TOKENS.CLIENTS.LOAN_SERVICE_CLIENT)
    private _loanServiceClient: ILoanServiceClient,

    @inject(DI_TOKENS.CLIENTS.BILLING_SERVICE_CLIENT)
    private _billingServiceClient: IBillingServiceClient,

    @inject(DI_TOKENS.CLIENTS.TRANSACTION_SERVICE_CLIENT)
    private _transactionServiceClient: ITransactionServiceClient,

    @inject(DI_TOKENS.CLIENTS.USER_SERVICE_CLIENT)
    private _userServiceClient: IUserServiceClient,
  ) {}

  async getDashboardAnalytics(type: string = "monthly"): Promise<any> {
    try {
      const formattedType = (type === "yearly" || type === "monthly") ? type : "monthly";

      const [loanStats, billerStats, userStats, transactionStats] =
        await Promise.all([
          this._loanServiceClient.getLoanStats(),
          this._billingServiceClient.getBillerStats(),
          this._userServiceClient.getGlobalUserStats(),
          this._transactionServiceClient.getGlobalTransactionStats(formattedType),
        ]);
      
      console.log("Analytics Data Fetched:", {
        loanStats: loanStats.data,
        billerStats: billerStats.data,
        userStats: userStats.data,
        transactionStats: transactionStats.data,
      });

      return {
        customers: userStats.data,
        transactions: transactionStats.data,
        loans: loanStats.data,
        billers: billerStats.data,
      };
    } catch (error) {
      console.error("Dashboard analytics aggregation failed:", error);
      throw new Error("Failed to fetch dashboard analytics");
    }
  }
}
