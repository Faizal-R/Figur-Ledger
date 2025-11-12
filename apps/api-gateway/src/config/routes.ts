import { Roles } from "@figur-ledger/types";
import { IRoute } from "../types";
import { serviceRegistry, ServiceName } from "./serviceRegistry";

export const routes: IRoute[] = [
  {
    url: "/api/v1/auth/",
    auth: false,
    // rateLimit: {
    //   windowMs: 15 * 60 * 1000,
    //   max: 100
    // },
    proxy: {
      target: serviceRegistry[ServiceName.AUTH].target,
      changeOrigin: true,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,
    pathRewrite:{
      "^/": "/api/v1/auth"
    }
    }
  },
  {
    url: "/api/v1/users/",
    auth: true,
    roles: [Roles.CUSTOMER, Roles.ADMIN, Roles.EMPLOYEE],
    proxy: {
      target: serviceRegistry[ServiceName.USERS].target,
      changeOrigin: true,
      timeout: serviceRegistry[ServiceName.USERS].timeout
    }
  },
 
];