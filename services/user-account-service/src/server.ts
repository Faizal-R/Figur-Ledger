import "reflect-metadata"
import "./di/inversify.config";

import app from "./app";
import { connectDatabase } from "./gateway/config/db";

import dotenv from "dotenv";
import { RabbitMQ } from "@figur-ledger/messaging-sdk";
import { resolve } from "./di";
import { DI_TOKENS } from "./di/types";
import { UserRegisteredConsumer } from "./gateway/messaging/consumers/UserRegisteredConsumer";

dotenv.config();

const PORT = process.env.PORT 

const startServer = async () => {
  try {
    await RabbitMQ.connect(process.env.RABBITMQ_URI as string)
    await connectDatabase();
    const consumer = resolve<UserRegisteredConsumer>(DI_TOKENS.CONSUMERS.USER_REGISTERED_CONSUMER);
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
  await connectDatabase();
  process.exit(0);
});
