import 'reflect-metadata'
import './di/inversify.config'
import express from "express";
import dotenv from "dotenv";
import { RabbitMQ } from "@figur-ledger/messaging-sdk";
import {  resolve} from './di';
import { DI_TOKENS } from './di/types';
import { UserRegisteredConsumer } from './application/consumers/UserRegisteredConsumer';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors())

(async () => {
  // Boot your RabbitMQ consumers
   await RabbitMQ.connect(process.env.RABBITMQ_URI as string)
//   await startPaymentConsumer();
 const userRegisteredConsumer=resolve<UserRegisteredConsumer>(DI_TOKENS.CONSUMERS.USER_REGISTER_CONSUMER)
 const transactionCompletedConsumer=resolve<UserRegisteredConsumer>(DI_TOKENS.CONSUMERS.TRANSACTION_COMPLETED_CONSUMER)
    userRegisteredConsumer.start()
    transactionCompletedConsumer.start()
  // Boot your HTTP server
  app.listen(PORT, () => {
    console.log(`Notification service listening on port ${PORT}`);
  });
})();
