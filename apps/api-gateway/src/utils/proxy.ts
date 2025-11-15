
import { Application } from "express";

import { createProxyMiddleware } from "http-proxy-middleware";

import { IRoute } from "../types";
import proxy from "express-http-proxy";

export const useApiProxy = (app: Application, routes: IRoute[]) => {
  routes.forEach((route) => {
    app.use(route.url, proxy(route.proxy.target,route.proxy));
  });
};
