import { Admin } from "../models/index.js";
import { assertAuthToken } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";

/** requireAuth — verifies the Bearer JWT, then reloads the admin from the DB
 * so revoked/disabled accounts are rejected on every protected request. */
export async function requireAuth(req, res, next) {
  try {
    assertAuthToken(req);
  } catch (error) {
    return next(error);
  }

  try {
    const admin = await Admin.findById(req.auth.sub).lean();
    if (!admin || !admin.active) {
      return next(new AppError("Account is disabled or no longer available", 401));
    }
    req.admin = admin;
    req.auth = {
      sub: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
}