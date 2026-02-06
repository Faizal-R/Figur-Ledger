import "reflect-metadata"
import "./di/inversify.config";

import app from "./app";
import { connectDatabase } from "./config/dbConnection";

import dotenv from "dotenv";
import { RabbitMQ } from "@figur-ledger/messaging-sdk";
import { resolve } from "./di";
import { CreditProfileConsumer } from "./messaging/consumers/CreditProfileConsumer";
import { DI_TOKENS } from "./di/types";

dotenv.config();

const PORT = process.env.PORT 

const startServer = async () => {
  try {
    await RabbitMQ.connect(process.env.RABBITMQ_URI as string)
    await connectDatabase();
    const consumer = resolve<CreditProfileConsumer>(DI_TOKENS.CONSUMERS.CREDIT_PROFILE_CONSUMER);
    consumer.start();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("🔻 Closing server...");
  // await connectDatabase();
  process.exit(0);
});
