import { ServiceConfig } from "../types";
import dotenv from "dotenv";
dotenv.config();

export enum ServiceName {
  AUTH = "auth",
  USERS = "users",
  NOTIFICATIONS = "notifications",
}

export const serviceRegistry: Record<ServiceName, ServiceConfig> = {
  [ServiceName.AUTH]: {
    name: ServiceName.AUTH,
    target: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  [ServiceName.USERS]: {
    name: ServiceName.USERS,
    target: process.env.USER_SERVICE_URL || "http://localhost:5002",
    healthCheckPath: "/health",
    timeout: 5000,
  },
  [ServiceName.NOTIFICATIONS]: {
    name: ServiceName.NOTIFICATIONS,
    target: process.env.NOTIFICATIONS_SERVICE_URL || "http://localhost:5003",
    healthCheckPath: "/health",
    timeout: 5000,
  },
};
