import mongoose from "mongoose";

import { env } from "../config/env.js";

export const dbStates = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Connects to MongoDB. Phase 3 activates this when models are added.
 * Without a URI (dev), it logs a warning and leaves the server runnable so the
 * API boots and /api/health still responds.
 */
export async function connectDB() {
  if (!env.mongoUri) {
    console.warn("[db] MONGODB_URI not set — running without database (health will show db: unavailable).");
    return false;
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("[db] MongoDB connected");
  return true;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}