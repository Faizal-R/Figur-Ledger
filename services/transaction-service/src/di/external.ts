import container from ".";


import { DI_TOKENS } from "./types";
import { RazorpayClient } from "../infra/external/RazorPayClient";
import { IRazorpayClient } from "../domain/interfaces/external/IRazorPayClient";



container.bind<IRazorpayClient>(DI_TOKENS.EXTERNAL.RAZORPAY_CLIENT).to(RazorpayClient).inSingletonScope();