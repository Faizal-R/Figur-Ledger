
import { Application } from "express";

import { IRoute } from "../types";
import proxy from "express-http-proxy";

export const useApiProxy = (app: Application, routes: IRoute[]) => {
  routes.forEach((route) => {
    app.use(
      route.url,
      proxy(route.proxy.target, {
        ...route.proxy,
        proxyErrorHandler: (err, res, next) => {
          console.error("Proxy Error:", err.message);
          next(err);
        },
        userResDecorator: (proxyRes, proxyResData, req, res) => {
          console.log(`[Proxy] ${req.method} ${req.originalUrl} → ${route.proxy.target}`);
          return proxyResData;
        }
      })
    );
  });
};
