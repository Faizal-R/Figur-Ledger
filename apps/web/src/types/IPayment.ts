import { IBiller } from "./IBill";

export interface IPayment {
  type: string;
  _id?: string;

  payerUserId: string;
  payerAccountId: string;

  payeeType: "BILLER";
  payeeId: string|IBiller;
  payeeAccountId: string;

  amount: number;

  status?: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED" | "REFUNDED";

  referenceId?: string; // consumer number or external reference
  transactionId?: string; // returned from transaction service

  settled?: boolean;
  settledAt?: Date;

  createdAt?: Date;
  completedAt?: Date;
}
