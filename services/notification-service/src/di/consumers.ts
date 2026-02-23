import container from ".";

import { UserRegisteredConsumer

 } from "../application/consumers/UserRegisteredConsumer";

 import { TransactionCompletedConsumer } from "../application/consumers/TransactionCompletedConsumer";
 import { LoanStatusUpdateConsumer } from "../application/consumers/LoanStatusConsumer";
import { DI_TOKENS } from "./types";



 container
 .bind(DI_TOKENS.CONSUMERS.TRANSACTION_COMPLETED_CONSUMER).to(TransactionCompletedConsumer)
 container
 .bind(DI_TOKENS.CONSUMERS.USER_REGISTER_CONSUMER).to(UserRegisteredConsumer)
 container
 .bind(DI_TOKENS.CONSUMERS.LOAN_STATUS_UPDATE_CONSUMER).to(LoanStatusUpdateConsumer)