import { errorResponse } from "./response";

import { Request,NextFunction, Response } from "express";
export const tryCatch = <T>(
  controllerFn: (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<T>
) => {
  return async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      errorResponse(res,error)
    }
  };
};