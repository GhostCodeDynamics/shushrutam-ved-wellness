import { logError } from "../utils/AppError.js";

export function notFoundMiddleware(req, res, next) {
  res.status(404).json({
    error: "Not found",
    message: `No route for ${req.method} ${req.originalUrl}`,
  });
}

export function errorMiddleware(error, req, res, next) {
  logError(error);

  let status;
  let message;

  if (error?.name === "CastError" && error?.path === "_id") {
    status = 404;
    message = "Resource not found";
  } else if (error?.code === 11000) {
    status = 409;
    message = "A record with this value already exists";
  } else if (error?.status && Number.isInteger(error.status)) {
    status = error.status;
    message = error.message;
  } else {
    status = 500;
    message = "Internal server error";
  }

  // `error` is the canonical key; `message` mirrors it so browser clients that
  // read `data.message` show the real reason instead of "Request failed (400)".
  const body = { error: message, message };
  if (error?.details) {
    body.details = error.details;
  }
  res.status(status).json(body);
}