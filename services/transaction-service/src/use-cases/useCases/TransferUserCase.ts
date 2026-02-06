import { inject, injectable } from "inversify";
import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { DI_TOKENS } from "../../infra/di/types";
import { ITransferUseCase } from "./interfaces/ITransferUseCase";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";
@injectable()
export class TransferUseCase implements ITransferUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.TRANSACTION_REPOSITORY)
    private _transactionRepo: ITransactionRepository,

    @inject(DI_TOKENS.HTTP.ACCOUNT_SERVICE_CLIENT)
    private accountClient: IAccountServiceClient
  ) {}

  async execute(input: {
    senderAccountId: string;
    receiverAccountId: string;
    amount: number;
   
  }) {
    
    // const existing = await this._transactionRepo.findByIdempotencyKey(
    //   input.idempotencyKey
    // );
    // if (existing) return existing;

    // 2. Create Transaction (Saga Start)
    const transaction = new Transaction(
      crypto.randomUUID(),
      crypto.randomUUID(),
       crypto.randomUUID(),
      input.senderAccountId,
      input.receiverAccountId,
      input.amount,
       "INR",
      "PENDING",
      "TRANSFER",
      null,
      new Date(),
      new Date()
    );

    await this._transactionRepo.create(transaction);

    try {
      // 3. Debit Sender
      await this.accountClient.debitAccount({
        accountId: input.senderAccountId,
        amount: input.amount,
        transactionId: transaction.id,
      });

      await this._transactionRepo.updateById(transaction.id, {
        status: "DEBIT_SUCCESS",
      });

      // 4. Credit Receiver
      await this.accountClient.creditAccount({
        accountId: input.receiverAccountId,
        amount: input.amount,
        transactionId: transaction.id,
      });

      // 5. Final Success
      await this._transactionRepo.updateById(transaction.id, {
        status: "SUCCESS",
      });
     console.log("TransactionCompleted",transaction)
      return transaction;
    } catch (error) {
      // 6. Compensation (Only if debit already happened)
      const state = await this._transactionRepo.findById(transaction.id);

      if (state?.status === "DEBIT_SUCCESS") {
        await this.accountClient.refund({
          accountId: input.senderAccountId,
          amount: input.amount,
          transactionId: transaction.id,
        });

        await this._transactionRepo.updateById(transaction.id, {
          status: "ROLLED_BACK",
        });
      } else {
        await this._transactionRepo.updateById(transaction.id, {
          status: "FAILED",
        });
      }

      throw error;
    }
  }
}

