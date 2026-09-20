import { timingSafeEqual } from "node:crypto";

import { env } from "../config/env.js";
import { Admin } from "../models/index.js";
import { hashPassword, signToken, verifyPassword } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import { assertLoginPayload, assertSetupPayload } from "../validators/auth.validator.js";

function secretMatches(secret, expected) {
  const a = Buffer.from(String(secret || ""));
  const b = Buffer.from(String(expected || ""));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function anonLoginFailure() {
  // Generic message for unknown email or wrong password — no user enumeration.
  throw new AppError("Invalid credentials", 401);
}

export async function login(req, res, next) {
  try {
    const { email, password } = assertLoginPayload(req.body);

    const admin = await Admin.findOne({ email }).lean();
    if (!admin || !admin.active) return anonLoginFailure();

    const ok = await verifyPassword(password, admin.passwordHash);
    if (!ok) return anonLoginFailure();

    await Admin.updateOne({ _id: admin._id }, { $set: { lastLoginAt: new Date() } });

    const token = signToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    res.json({ token, admin: publicAdmin(admin) });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  // Stateless JWT: the client discards the token. A short expiry bounds any reuse.
  res.status(204).end();
}

export async function me(req, res, next) {
  try {
    const admin = await Admin.findById(req.auth.sub).lean();
    if (!admin || !admin.active) {
      return next(new AppError("Account is disabled or no longer available", 401));
    }
    res.json({ admin: publicAdmin(admin) });
  } catch (error) {
    next(error);
  }
}

export async function setup(req, res, next) {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      throw new AppError("First admin already exists", 409);
    }

    const hasBootstrap = Boolean(env.bootstrapSecret);
    const { email, password, name } = assertSetupPayload(req.body, hasBootstrap);

    if (hasBootstrap && !secretMatches(req.body.bootstrap, env.bootstrapSecret)) {
      throw new AppError("Bootstrap secret is invalid", 403);
    }

    const passwordHash = await hashPassword(password);
    const admin = await Admin.create({ email, passwordHash, name, role: "admin" });

    res.status(201).json({ admin: publicAdmin(admin.toObject()) });
  } catch (error) {
    next(error);
  }
}

function publicAdmin(admin) {
  return {
    id: String(admin._id),
    email: admin.email,
    name: admin.name,
    role: admin.role,
    active: admin.active,
    lastLoginAt: admin.lastLoginAt || null,
    createdAt: admin.createdAt,
  };
}