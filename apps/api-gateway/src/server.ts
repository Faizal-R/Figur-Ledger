import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./lib/cors";
import { useApiProxy } from "./utils/proxy";
import { useAuth } from "./utils/auth";
import { limiter } from "./lib/rate-limiter";
import { routes } from "./routes";

const app: Application = express();

export const server = () => {
  middlewares(app);
  listen(app);
};
app.get("/health", (req, res) => res.send("OK"));

const middlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(limiter)
  useApiProxy(app, routes);
 
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const listen = (app: Application) => {
  const port = process.env.PORT || 5005;

  app.listen(port, () => console.log(`Gateway Server is running on port ${port}`));
};

