import { Roles } from "@figur-ledger/shared";
import { Request } from "express";

export interface ProxyConfig {
  target: string;
  timeout: number;
  proxyReqPathResolver?: (req: Request) => string;
  filter?: (req: any) => boolean;
  onError?: (err: Error, req: any, res: any) => void;
}

export interface IRoute {
  url: string;         // base route prefix e.g. "/api/v1/users"
  auth: boolean;       // enable/disable auth middleware
  roles?: Roles[];     // optional RBAC enforcement

  rateLimit?: {        // optional throttling
    windowMs: number;
    max: number;
  };

  proxy: ProxyConfig;  // express-http-proxy config
}

export interface ServiceConfig {
  name: string;
  target: string;        // upstream service URL
  timeout: number;
  healthCheckPath?: string;
}
