import { ApiErrorResponse } from "@/types/api/api";
import {  HttpStatusCode, isAxiosError } from "axios";

export const parseAxiosError = (
  error: unknown,
  defaultMessage: string
): ApiErrorResponse => {
  if (isAxiosError(error)) {
    return {
      success: false,
      error: true,
      status: error.response?.status ?? HttpStatusCode.InternalServerError,
      message: error.response?.data?.message ?? defaultMessage,
    };
  }

  return {
    success: false,
    error: true,
    status: HttpStatusCode.InternalServerError,
    message: defaultMessage,
  };
};
