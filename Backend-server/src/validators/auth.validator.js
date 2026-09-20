import { AppError } from "../utils/AppError.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 8;

export function validateEmail(value) {
  if (typeof value !== "string" || !EMAIL_RE.test(value.trim())) {
    throw new AppError("A valid email address is required", 400, { field: "email" });
  }
  return value.trim().toLowerCase();
}

export function validatePassword(value, { changing = false } = {}) {
  if (typeof value !== "string" || value.length < PASSWORD_MIN) {
    throw new AppError(`Password must be at least ${PASSWORD_MIN} characters`, 400, {
      field: "password",
    });
  }
  if (!changing && value.length > 128) {
    throw new AppError("Password is too long", 400, { field: "password" });
  }
  return value;
}

export function validateName(value) {
  const name = typeof value === "string" ? value.trim() : "";
  if (!name || name.length > 120) {
    throw new AppError("A name is required (max 120 characters)", 400, { field: "name" });
  }
  return name;
}

export function assertSetupPayload(body, requireBootstrap) {
  if (!body || typeof body !== "object") {
    throw new AppError("Request body is required", 400);
  }
  if (requireBootstrap && typeof body.bootstrap !== "string") {
    throw new AppError("Bootstrap secret is required", 403);
  }
  const email = validateEmail(body.email);
  const password = validatePassword(body.password);
  const name = validateName(body.name);
  return { email, password, name };
}

export function assertLoginPayload(body) {
  if (!body || typeof body !== "object") {
    throw new AppError("Request body is required", 400);
  }
  const email = validateEmail(body.email);
  const password = typeof body.password === "string" ? body.password : "";
  return { email, password };
}