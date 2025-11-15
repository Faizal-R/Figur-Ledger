import { Roles } from "@figur-ledger/types";
import { IRoute } from "../types";
import { serviceRegistry, ServiceName } from "./serviceRegistry";

export const routes: IRoute[] = 
[
  {
    url: "/api/v1/auth/",
    auth: false,

    proxy: {
      target: serviceRegistry[ServiceName.AUTH].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,

      proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`
    },
  },{
    url: "/api/v1/users/",
    auth: false,

    proxy: {
      target: serviceRegistry[ServiceName.USER_ACCOUNT].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,
      proxyReqPathResolver: (req) => `/api/v1/users${req.url}`
    },
  },
  {
    url: "/api/v1/accounts/",
    auth: false,

    proxy: {
      target: serviceRegistry[ServiceName.USER_ACCOUNT].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,
      proxyReqPathResolver: (req) => `/api/v1/accounts${req.url}`
    },
  },



];

// import { IRoute } from "../types";

