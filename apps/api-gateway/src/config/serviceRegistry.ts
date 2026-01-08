import { ServiceConfig } from "../types";
import dotenv from "dotenv";
dotenv.config();

export enum ServiceName {
  AUTH = "auth",
  USER_ACCOUNT = "user-account",
  NOTIFICATIONS = "notifications",
  TRANSACTIONS="transactions",
  LOAN_CREDIT="loan-credit"
  
}

export const serviceRegistry: Record<ServiceName, ServiceConfig> = {
  [ServiceName.AUTH]: {
    name: ServiceName.AUTH,
    target: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  [ServiceName.USER_ACCOUNT]: {
    name: ServiceName.USER_ACCOUNT,
    target: process.env.USER_ACCOUNT_SERVICE_URL || "http://localhost:5002",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  
  [ServiceName.NOTIFICATIONS]: {
    name: ServiceName.NOTIFICATIONS,
    target: process.env.NOTIFICATIONS_SERVICE_URL || "http://localhost:5003",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  [ServiceName.TRANSACTIONS]: {
    name: ServiceName.TRANSACTIONS,
    target: process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  [ServiceName.LOAN_CREDIT]: {
    name: ServiceName.LOAN_CREDIT,
    target: process.env.LOAN_CREDIT_SERVICE_URL || "http://localhost:5005",
    healthCheckPath: "/health",
    timeout: 5000,
  },
};
