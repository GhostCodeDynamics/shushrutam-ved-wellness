import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

const BCRYPT_COST = 10;

export async function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(password, passwordHash) {
  if (!password || !passwordHash) return false;
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch {
    return false;
  }
}

export function signToken({ id, email, role, name }) {
  return jwt.sign({ sub: id, email, role, name }, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: env.jwtExpiresIn,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] });
  } catch {
    return null;
  }
}

/** Extracts the Bearer token from an Authorization header, if present. */
export function extractBearerToken(req) {
  const header = req.get("authorization") || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim();
}

/** Asserts a valid Bearer token, sets req.auth, or throws AppError(401). */
export function assertAuthToken(req) {
  const token = extractBearerToken(req);
  if (!token) {
    throw new AppError("Authentication required", 401);
  }
  const payload = verifyToken(token);
  if (!payload || !payload.sub) {
    throw new AppError("Invalid or expired token", 401);
  }
  req.auth = { sub: payload.sub, email: payload.email, role: payload.role, name: payload.name };
}