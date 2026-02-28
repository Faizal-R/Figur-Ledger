import "reflect-metadata";
import "./di/inversify.config";

import app from "./app";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
let server: ReturnType<typeof app.listen>;
const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();

// Graceful Shutdown
const shutdown = async () => {
  console.log("🔻 SIGINT received. Shutting down gracefully...");

  if (server) {
    server.close(async () => {
      console.log("🛑 HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
