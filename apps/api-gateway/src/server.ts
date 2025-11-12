import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./lib/cors";
import { useApiProxy } from "./utils/proxy";
import { useAuth } from "./utils/auth";
import { limiter } from "./lib/rate-limiter";
import { routes } from "./config/routes";
import morgan from "morgan";

const app: Application = express();

const middlewares = (app: Application) => {
  app.use(morgan("dev"))
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
  listen(app);
};
app.get('/health', (req, res) => {
 res.status(200).json({ 
   status: 'OK', 
   service: 'api-gateway1',
   timestamp: new Date().toISOString()
 });
});

// app.use('*', (_req, res) => {
// res.status(404).json({ error: 'Route not found' });
// });

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const listen = (app: Application) => {
  const port = process.env.PORT ;

  app.listen(port, () => console.log(`Gateway Server is running on port ${port}`));
};

