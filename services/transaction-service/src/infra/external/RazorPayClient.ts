// src/modules/transaction/infra/razorpay/RazorpayClient.ts

import Razorpay from "razorpay";
import crypto from "crypto";
import { IRazorpayClient } from "../../domain/interfaces/external/IRazorPayClient";
import dotenv from "dotenv";
dotenv.config();
export class RazorpayClient implements IRazorpayClient {
  private client = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_SECRET_KEY!
  });

  createOrder(amount: number) {
    return this.client.orders.create({
      amount: amount * 100,
      currency: "INR",
      payment_capture: true
    });
  }

  verifySignature(orderId: string, paymentId: string, signature: string):boolean {
      const body = orderId + "|" + paymentId;
       const expected = crypto
       .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
       .update(body)
       .digest("hex");

       return expected === signature;
  }

  async fetchPayment(paymentId: string) {
    return await this.client.payments.fetch(paymentId);
  }
}
