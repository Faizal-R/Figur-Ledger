import { inject, injectable } from "inversify";
import { ITransactionUseCase } from "./interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../infra/di/types";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { Transaction, TransactionType, TTransactionStatus } from "../../domain/entities/Transaction";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import { ITransactionFilters } from "../../types/ITransactionFilters";
import { TransactionMessages } from "../../infra/constants/TransactionMessages";

@injectable()
export class TransactionUseCase implements ITransactionUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.TRANSACTION_REPOSITORY)
    private _transactionRepository: ITransactionRepository,

    @inject(DI_TOKENS.HTTP.ACCOUNT_SERVICE_CLIENT)
    private readonly _accountServiceClient: IAccountServiceClient,
  ) {}

  async processDeposit(
    accountId: string,
    amount: number,
    referenceId: string,
  ): Promise<{ balance: number; txId: string }> {
    const idempotencyKey = `DEPOSIT:${referenceId}`;
    const existingTx =
      await this._transactionRepository.findByIdempotencyKey(idempotencyKey);

    if (existingTx) {
      if (existingTx.status === "SUCCESS") {
        // Already processed → return safely
        const balance = await this._accountServiceClient.getBalance(accountId);
        return { balance, txId: existingTx.id };
      }

      if (existingTx.status === "PENDING") {
        throw new Error(TransactionMessages.TX_IN_PROGRESS);
      }

      if (existingTx.status === "FAILED") {
      }
    }

    const transaction = new Transaction(
      crypto.randomUUID(), // internal DB id
      referenceId, // external correlation id
      idempotencyKey,
      null, // senderAccountId
      accountId, // receiverAccountId
      amount,
      "INR",
      "PENDING",
      "DEPOSIT",
      null, // senderBalanceAfter
      null, // receiverBalanceAfter
      null, // failureReason
      new Date(),
      new Date(),
    );

    const createdTx = await this._transactionRepository.create(transaction);

    try {
      const result = await this._accountServiceClient.creditAccount({
        accountId,
        amount,
      });
      console.log("Account credited:", result);

      await this._transactionRepository.updateById(createdTx.id, {
        status: "SUCCESS",
      });
      console.log("Transaction marked as SUCCESS");
      console.log(result);

      return { balance: result.balance, txId: createdTx.id };
    } catch (error: any) {
      await this._transactionRepository.updateById(createdTx.id, {
        status: "FAILED",
      });

      throw new CustomError(
        TransactionMessages.DEPOSIT_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async processWithdrawal(
    accountId: string,
    amount: number,
    referenceId: string,
  ): Promise<{ balance: number; txId: string }> {
    const idempotencyKey = `WITHDRAWAL:${referenceId}`;

    const existingTx =
      await this._transactionRepository.findByIdempotencyKey(idempotencyKey);

    if (existingTx) {
      if (existingTx.status === "SUCCESS") {
        // Already processed → return safely
        const balance = await this._accountServiceClient.getBalance(accountId);
        return { balance, txId: existingTx.id };
      }

      if (existingTx.status === "PENDING") {
        throw new Error(TransactionMessages.TX_IN_PROGRESS);
      }

      if (existingTx.status === "FAILED") {
        // Allow retry → continue execution
      }
    }

    const transaction = new Transaction(
      crypto.randomUUID(), // internal DB id
      referenceId, // external correlation id
      idempotencyKey,
      accountId, // senderAccountId
      null, // receiverAccountId
      amount,
      "INR",
      "PENDING",
      "WITHDRAW",
      null, // senderBalanceAfter
      null, // receiverBalanceAfter
      null, // failureReason
      new Date(),
      new Date(),
    );

    const createdTx = await this._transactionRepository.create(transaction);

    try {
      const result = await this._accountServiceClient.debitAccount({
        accountId,
        amount,
      });

      console.log("Account debited:", result);

      await this._transactionRepository.updateById(createdTx.id, {
        status: "SUCCESS",
      });

      console.log("Transaction marked as SUCCESS");

      return { balance: result.balance, txId: createdTx.id };
    } catch (error: any) {
      console.error("Error during withdrawal:", error);
      await this._transactionRepository.updateById(createdTx.id, {
        status: "FAILED",
      });

      throw new CustomError(
        TransactionMessages.WITHDRAWAL_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransactionHistory(
    accountId: string,
    page: number,
    filters?: ITransactionFilters,
  ): Promise<{ transactions: Transaction[]; totalPages: number }> {
    try {
      const { transactions, totalPages } =
        await this._transactionRepository.findByAccountId(
          accountId,
          page,
          filters,
        );
      console.log("Transaction history: ", transactions);
      return { transactions, totalPages };
    } catch (error: unknown) {
      throw new CustomError(
        TransactionMessages.HISTORY_FETCH_FAILED,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransactionStats(period: "daily" | "monthly" | "yearly"): Promise<any> {
    try {
      const stats = await this._transactionRepository.getGlobalStats();
      const volume = await this._transactionRepository.getTransactionVolume(period);
      return {
        count: stats.count,
        totalVolume: stats.volume,
        volume,
      };
    } catch (error: unknown) {
      throw new CustomError(
        "Failed to fetch transaction stats",
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
