import "reflect-metadata"
import "./di/inversify.config";

import app from "./app";
// import { connectDatabase } from "./gateway/config/db";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT 

const startServer = async () => {
  try {
    // await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();

// Graceful Shutdown
// process.on("SIGINT", async () => {
//   console.log("🔻 Closing server...");
//   await connectDatabase();
//   process.exit(0);
// });
