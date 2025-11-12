import { Roles } from "@figur-ledger/types";

export interface ProxyConfig {
  target: string;
  changeOrigin: boolean;
  pathRewrite?: Record<string, string>;
  timeout: number;
  onError?: (error: Error) => void;
}

export interface IRoute {
  url: string;
  auth: boolean;
  roles?: Roles[];
  rateLimit?: {
    windowMs: number;
    max: number;
  };
  proxy: ProxyConfig;
}

export interface ServiceConfig {
  name: string;
  target: string;
  healthCheckPath?: string;
  timeout: number;
}