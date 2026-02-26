import { inject, injectable } from "inversify";
import { ITransactionUseCase } from "./interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../infra/di/types";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { Transaction } from "../../domain/entities/Transaction";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { CustomError } from "@figur-ledger/utils";
import { statusCodes } from "@figur-ledger/shared";
import { ITransactionFilters } from "../../types/ITransactionFilters";

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
        throw new Error("Transaction already in progress");
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
      TransactionStatus.PENDING,
      TransactionType.DEPOSIT,
      null,
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
        status: TransactionStatus.SUCCESS,
      });
      console.log("Transaction marked as SUCCESS");
      console.log(result);

      return { balance: result.balance, txId: createdTx.id };
    } catch (error: any) {
      await this._transactionRepository.updateById(createdTx.id, {
        status: TransactionStatus.FAILED,
      });

      throw new CustomError(
        `Deposit failed: ${error.message || "Unknown error"}`,
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
        throw new Error("Transaction already in progress");
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
      TransactionStatus.PENDING,
      TransactionType.WITHDRAW,
      null,
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
        status: TransactionStatus.SUCCESS,
      });

      console.log("Transaction marked as SUCCESS");

      return { balance: result.balance, txId: createdTx.id };
    } catch (error: any) {
      console.error("Error during withdrawal:", error);
      await this._transactionRepository.updateById(createdTx.id, {
        status: TransactionStatus.FAILED,
      });

      throw new CustomError(
        `Withdrawal failed: ${error.message || "Unknown error"}`,
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
        `Transaction history fetch failed: ${(error as Error).message || "Unknown error"}`,
        statusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
