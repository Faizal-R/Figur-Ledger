import { Roles } from "@figur-ledger/types";
import { IRoute } from "../types";
import { serviceRegistry, ServiceName } from "./serviceRegistry";

// export const routes: IRoute[] = [
//   {
//     url: "/api/v1/auth/",
//     auth: false,
//     // rateLimit: {
//     //   windowMs: 15 * 60 * 1000,
//     //   max: 100
//     // },
//     proxy: {
//       target: serviceRegistry[ServiceName.AUTH].target,
//       changeOrigin: true,
//       timeout: serviceRegistry[ServiceName.AUTH].timeout,
//     // pathRewrite:{
//     //   "^/api/v1/auth": "/api/v1/auth"
//     // }
//     }
//   },
//   {
//     url: "/api/v1/users/",
//     auth: true,
//     roles: [Roles.CUSTOMER, Roles.ADMIN, Roles.EMPLOYEE],
//     proxy: {
//       target: serviceRegistry[ServiceName.USERS].target,
//       changeOrigin: true,
//       timeout: serviceRegistry[ServiceName.USERS].timeout
//     }
//   },
 
// ];

// import { IRoute } from "../types";


export const routes: IRoute[] = [{
    url: "/api/v1/auth",
    auth: false,
    proxy: {
        target: "http://localhost:5001",
        changeOrigin: true,
        timeout:10000,
        pathRewrite: {
        '^/api/v1/auth': '/api/v1/auth/' 
    },
    }
},{
    url: "/api/v1/users",
    auth: false,
    proxy: {
        target: "http://localhost:5002",
        changeOrigin: true,
        timeout:5000

    }
}

]