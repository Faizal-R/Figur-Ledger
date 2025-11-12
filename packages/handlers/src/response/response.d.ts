import { Response } from "express";
export declare function createResponse<T>(response: Response, statusCode: number, success: boolean, message: string, data?: T | null): void;
export declare const errorResponse: (response: Response, error: unknown) => void;
