import { Response } from "express";
import { HTTP_STATUS_CODE } from "../../domain/enums/HttpStatusCodes";
import { CustomError } from "../../errors/CustomError";

export function createResponse<T>(
  response: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null
): void {
  response.status(statusCode).json({
    success,
    message,
    data,
  });
}

export const errorResponse = (response: Response, error: unknown): void => {
  const errorMessage =
    error instanceof CustomError
      ? error.message
      : error instanceof Error
      ? error.message
      : "Something unexpected happened";
      console.log("ErrorResponse : ",error)
  createResponse(
    response,
     error instanceof CustomError
      ? error.statusCode
      : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    false,
    errorMessage
  );
};
