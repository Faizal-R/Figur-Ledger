import { Roles } from "@figur-ledger/shared";
import { IRoute } from "../types";
import { serviceRegistry, ServiceName } from "./serviceRegistry";


export const ApiGateWayRoutes={
  HEALTH_CHECK: "/health",
}


export const routes: IRoute[] = 
[
  {
    url: "/api/v1/auth",
    auth: false,
    proxy: {
      target: serviceRegistry[ServiceName.AUTH].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,

      proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`
    },
  },{
    url: "/api/v1/users",
    auth: true,
    roles: [Roles.CUSTOMER,Roles.ADMIN,Roles.EMPLOYEE],

    proxy: {
      target: serviceRegistry[ServiceName.USER_ACCOUNT].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,
      proxyReqPathResolver: (req) => `/api/v1/users${req.url}`
    },

  },
  {
    url: "/api/v1/accounts",
    auth: true,
    roles:[Roles.CUSTOMER],

    proxy: {
      target: serviceRegistry[ServiceName.USER_ACCOUNT].target,
      timeout: serviceRegistry[ServiceName.AUTH].timeout,
      proxyReqPathResolver: (req) => `/api/v1/accounts${req.url}`
    },
  },
  {
    url: "/api/v1/transactions",
    auth: true,
    roles:[Roles.CUSTOMER],

    proxy: {
      target: serviceRegistry[ServiceName.TRANSACTIONS].target,
      timeout: serviceRegistry[ServiceName.TRANSACTIONS].timeout,
      proxyReqPathResolver: (req) => `/api/v1/transactions${req.url}`
    },
  },
  {
    url: "/api/v1/loan",
    auth: true,
    roles:[Roles.CUSTOMER,Roles.ADMIN,Roles.EMPLOYEE],

    proxy: {
      target: serviceRegistry[ServiceName.LOAN_CREDIT].target,
      timeout: serviceRegistry[ServiceName.LOAN_CREDIT].timeout,
      proxyReqPathResolver: (req) => `/api/v1/loan${req.url}`
    },
  },
  {
    url: "/api/v1/payments",
    auth: true,
    roles:[Roles.CUSTOMER,Roles.ADMIN,Roles.EMPLOYEE],

    proxy: {
      target: serviceRegistry[ServiceName.PAYMENT_BILLING].target,
      timeout: serviceRegistry[ServiceName.PAYMENT_BILLING].timeout,
      proxyReqPathResolver: (req) => `/api/v1/payments${req.url}`
    },
  },
  {
    url: "/api/v1/reports",
    auth: true,
    roles:[Roles.CUSTOMER,Roles.ADMIN,Roles.EMPLOYEE],

    proxy: {
      target: serviceRegistry[ServiceName.REPORT_ANALYTICS].target,
      timeout: serviceRegistry[ServiceName.REPORT_ANALYTICS].timeout,
      proxyReqPathResolver: (req) => `/api/v1/reports${req.url}`
    },
  },
  {
    url: "/api/v1/analytics",
    auth: true,
    roles:[Roles.ADMIN],

    proxy: {
      target: serviceRegistry[ServiceName.REPORT_ANALYTICS].target,
      timeout: serviceRegistry[ServiceName.REPORT_ANALYTICS].timeout,
      proxyReqPathResolver: (req) => `/api/v1/analytics${req.url}`
    },
  },



];







