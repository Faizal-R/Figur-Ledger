import { Application } from "express";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { checkRoleAccess } from "../middlewares/checkRoleAccess";
import { IRoute } from "../types";

export const useAuth = (app: Application, routes: IRoute[]) => {
  routes.forEach((route) => {
    // if (!route.auth) return;

    app.use(route.url);
  });
};
