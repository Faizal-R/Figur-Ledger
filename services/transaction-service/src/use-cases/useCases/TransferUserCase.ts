import { inject, injectable } from "inversify";
import { Transaction } from "../../domain/entities/Transaction";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { DI_TOKENS } from "../../infra/di/types";
import { ITransferUseCase } from "./interfaces/ITransferUseCase";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";
import { RabbitPublisher } from "@figur-ledger/messaging-sdk";
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
   const debitTx=   await this.accountClient.debitAccount({
        accountId: input.senderAccountId,
        amount: input.amount,
        transactionId: transaction.id,
      });
      console.log(
        "debitTx",debitTx)

      await this._transactionRepo.updateById(transaction.id, {
        status: "DEBIT_SUCCESS",
      });

      // 4. Credit Receiver
    const creditTx=  await this.accountClient.creditAccount({
        accountId: input.receiverAccountId,
        amount: input.amount,
        transactionId: transaction.id,
      });
      console.log("creditTx",creditTx)

      // 5. Final Success
    const latestUpdatedTx=  await this._transactionRepo.updateById(transaction.id, {
        status: "SUCCESS",
      });
     console.log("TransactionCompleted",transaction)
     const notificationMsg={
      debiterEmail:debitTx.debitedUserEmail,
      crediterEmail:creditTx.creditedUserEmail,
      amount:latestUpdatedTx?.amount,
      currency:"INR",
      transactionId:latestUpdatedTx?.id,
      date:latestUpdatedTx?.createdAt
     }
     console.log("notify",notificationMsg)
     RabbitPublisher("transaction.completed",JSON.stringify(notificationMsg))
  
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

