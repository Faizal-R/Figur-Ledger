import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./lib/cors";
import { useApiProxy } from "./utils/proxy";
import { useAuth } from "./utils/auth";
import { limiter } from "./lib/rate-limiter";
import { routes } from "./config/routes";
import morgan from "morgan";

import proxy from "express-http-proxy";
import { ServiceName, serviceRegistry } from "./config/serviceRegistry";

const app: Application = express();

const middlewares = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Auth proxy
  app.use(
  "/api/v1/auth",
  proxy(serviceRegistry[ServiceName.AUTH].target, {
    proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`,
  })
);

  // useApiProxy(app,routes)
};


export const server = () => {
  middlewares(app);

  // Register routes BEFORE starting server
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
    next();
  });

  listen(app);
};

const listen = (app: Application) => {
  const port = process.env.PORT;
  app.listen(port, () =>
    console.log(`Gateway Server is running on port ${port}`)
  );
};
