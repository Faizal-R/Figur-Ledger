import { inject, injectable } from "inversify";
import { ITransactionUseCase } from "./interfaces/ITransactionUseCase";
import { DI_TOKENS } from "../../di/types";
import { ITransactionRepository } from "../../domain/interfaces/repositories/ITransactionRepository";
import { IRazorpayClient } from "../../domain/interfaces/external/IRazorPayClient";
import { Transaction } from "../../domain/entities/Transaction";
import { IAccountServiceClient } from "../../domain/interfaces/http/IAccountServiceClient";
@injectable()
export class TransactionUseCase implements ITransactionUseCase {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.TRANSACTION_REPOSITORY)
    private _transactionRepository: ITransactionRepository,
    @inject(DI_TOKENS.EXTERNAL.RAZORPAY_CLIENT)
    private readonly _razorPayClient: IRazorpayClient,
    @inject(DI_TOKENS.HTTP.ACCOUNT_SERVICE_CLIENT)
    private readonly _accountServiceClient: IAccountServiceClient
  ) {}

  async processDeposit(accountId: string, amount: number): Promise<
  { orderId: string; amount: number; txId: string }> {
    if (amount <= 0) throw new Error("Invalid amount");

    const order = await this._razorPayClient.createOrder(amount);

    // const transactionId = crypto.randomUUID();
    const transaction = new Transaction(
      '',
      order.id,
      crypto.randomUUID(),
    
      null,
      accountId,

      amount,
      "INR",

      "PENDING", // initial state
      "DEPOSIT", // transaction type

      null, // failureReason
      null // metadata
    );

    const persistenceTx = await this._transactionRepository.create(transaction);
 
    return {
      orderId: order.id,
      amount: order.amount,
      txId: persistenceTx.id
    };
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string,txId:string): Promise<any> {
    const isValid =  this._razorPayClient.verifySignature(
      orderId,
      paymentId,
      signature
    );
    console.log("Is signature valid?", isValid);
    if (!isValid) {
      throw new Error("Invalid payment signature");
    }
    await this._transactionRepository.update(txId, {
      status: "SUCCESS",
    });

    console.log(
      `Payment verified for Order ID: ${orderId}, Payment ID: ${paymentId}, Tx ID: ${txId}`
    )
    const tx= await this._transactionRepository.findById(txId);
    if(!tx){
      throw new Error("Transaction not found");
    }

    // call account service to credit amount - to be implemented
   const respone= await this._accountServiceClient.creditAccount(tx.receiverAccountId as string, tx.amount);
    console.log("Account service response:", respone.data);

    return { updatedAmount: respone.data.updatedAmount  };

  }
}
