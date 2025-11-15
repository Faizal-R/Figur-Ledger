import "reflect-metadata"
import "./di/inversify.config";

import app from "./app";

import dotenv from "dotenv";
import { connectDatabase } from "./infrastructure/config/dbConnection";
import {RabbitMQ
 } from '@figur-ledger/messaging-sdk'

dotenv.config();

const PORT = process.env.PORT 

const startServer = async () => {
  try {
     await RabbitMQ.connect(process.env.RABBITMQ_URI as string);
        console.log('✅ RabbitMQ connected successfully');
    await connectDatabase();
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
