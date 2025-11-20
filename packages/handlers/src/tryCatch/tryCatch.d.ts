import { Request, NextFunction, Response } from "express";
export declare const tryCatch: <T>(controllerFn: (req: Request, res: Response, next?: NextFunction) => Promise<T>) => (req: Request, res: Response, next?: NextFunction) => Promise<void>;
