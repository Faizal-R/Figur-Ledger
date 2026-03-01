import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./lib/cors";
import { useApiProxy } from "./utils/proxy";
import { useAuth } from "./utils/auth";
import { limiter } from "./lib/rate-limiter";
import { routes } from "./config/routes";
import morgan from "morgan";
import { CommonMessages } from "@figur-ledger/shared";

const app: Application = express();

const middlewares = (app: Application) => {
  app.use((req, res, next) => {
    console.log(`[Gateway] Incoming: ${req.method} ${req.originalUrl}`);
    next();
  });
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  useAuth(app, routes);
  useApiProxy(app, routes);
};

export const server = () => {
  middlewares(app);

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({
      message: CommonMessages.INTERNAL_SERVER_ERROR,
    });
  });

  listen(app);
};

const listen = (app: Application) => {
  const port = process.env.PORT;
  app.listen(port, () =>
    console.log(`Gateway Server is running on port ${port}`),
  );
};

server()