import { inject, injectable } from "inversify";
import { IReportService } from "../interfaces/IReportService";
import { IAccountServiceClient } from "../../clients/http/interfaces/IAccountServiceClient";
import { DI_TOKENS } from "../../di/types";
import { ITransactionServiceClient } from "../../clients/http/interfaces/ITransactionServiceClient";
import { IUserServiceClient } from "../../clients/http/interfaces/IUserServiceClient";
import { resolvePeriod } from "../../utils/resolvePeriod";
import { AccountStatementMapper } from "../../mapper/AccountStatementMapper";

@injectable()
export class ReportService implements IReportService {
  constructor(
    @inject(DI_TOKENS.CLIENTS.ACCOUNT_SERVICE_CLIENT)
    private _accountServiceClient: IAccountServiceClient,
    @inject(DI_TOKENS.CLIENTS.TRANSACTION_SERVICE_CLIENT)
    private _transactionServiceClient: ITransactionServiceClient,
    @inject(DI_TOKENS.CLIENTS.USER_SERVICE_CLIENT)
    private _userServiceClient: IUserServiceClient,
  ) {}

  async getGeneratedStatement(
    accountId: string,
    statementData: {
      type: string;
      value: string;
      startDate?: string;
      endDate?: string;
      page?: string | number;
    },
  ): Promise<any> {
    console.log(accountId);
    console.log(statementData);

    const customRange =
      statementData.startDate && statementData.endDate
        ? {
            startDate: statementData.startDate,
            endDate: statementData.endDate,
          }
        : undefined;

    const { start, end } = resolvePeriod({
      type: statementData.type as "duration" | "fy" | "custom",
      value: statementData.value,
      customRange,
    });
    const { data } = await this._transactionServiceClient.getTransactions(
      accountId,
      start.toISOString(),
      end.toISOString(),
      Number(statementData.page) || 1,
    );

    console.log(data.transactions);

    const { data: account } =
      await this._accountServiceClient.getAccountDetailsById(accountId);
    console.log(account);
    const { data: user } = await this._userServiceClient.getUserDetails(
      account.userId,
    );
    console.log(user);

    const statement = AccountStatementMapper.toResponse(
      user,
      account,
      data.transactions,
      start.toISOString(),
      end.toISOString(),
      data.totalPages,
      Number(statementData.page) || 1,
    );

    console.log(statement);
    return statement;
  }
}
