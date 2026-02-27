import { CustomError } from "../errors/CustomError";

type Scope = "SERVICE" | "CONTROLLER" | "REPOSITORY" | "SYSTEM";
type Status = "SUCCESS" | "FAILED" | "STARTED";

interface LogContext {
  scope: Scope;
  method: string;
  action: string;
  status: Status;
}

const serializeError = (error: unknown) => {
  if (!error) return undefined;

  if (error instanceof CustomError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      stack: error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: typeof error === "string" ? error : JSON.stringify(error),
  };
};

const baseLog = (
  context: LogContext,
  error?: unknown,
  extra?: Record<string, unknown>
) => {
  const payload = {
    timestamp: new Date().toISOString(),
    ...context,
    ...(extra || {}),
    ...(error ? { error: serializeError(error) } : {}),
  };

  const output = JSON.stringify(payload);

  if (context.status === "FAILED") {
    console.error(output);
  } else {
    console.log(output);
  }
};

export const logger = {
  service: (method: string, action: string) => ({
    success: (extra?: Record<string, unknown>) =>
      baseLog(
        { scope: "SERVICE", method, action, status: "SUCCESS" },
        undefined,
        extra
      ),

    started: (extra?: Record<string, unknown>) =>
      baseLog(
        { scope: "SERVICE", method, action, status: "STARTED" },
        undefined,
        extra
      ),

    error: (error: unknown, extra?: Record<string, unknown>) =>
      baseLog(
        { scope: "SERVICE", method, action, status: "FAILED" },
        error,
        extra
      ),
  }),
};
