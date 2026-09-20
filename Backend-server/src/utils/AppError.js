import { env } from "../config/env.js";

/**
 * AppError — operational errors with an HTTP status. Thrown by controllers
 * and validators; handled centrally by error.middleware.
 */
export class AppError extends Error {
  constructor(message, status = 500, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.details = details;
    this.isOperational = true;
  }
}

export function notFoundError(resource = "Resource") {
  return new AppError(`${resource} not found`, 404);
}

export function conflictError(message) {
  return new AppError(message, 409);
}

export function validationError(message, details) {
  return new AppError(message, 400, details);
}

export function isOperationalError(error) {
  return error?.isOperational === true;
}

export function logError(error) {
  // Never log secrets. Env access is explicit; error messages are sanitised in the handler.
  const safeMessage = error?.message ?? "Unknown error";
  const context = error?.status ? ` (status ${error.status})` : "";
  console.error(`[error]${context}: ${safeMessage}`);
  if (env.isDevelopment) {
    console.error(error?.stack);
  }
}