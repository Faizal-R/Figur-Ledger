
import { Application } from "express";

import { createProxyMiddleware } from "http-proxy-middleware";

import { IRoute } from "../types";

export const useApiProxy = (app: Application, routes: IRoute[]) => {
  routes.forEach((route) => {
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
};
