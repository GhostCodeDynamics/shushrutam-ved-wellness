import "../src/config/resolver.js";
import { connectDB } from "../src/config/db.js";
import { env } from "../src/config/env.js";
import { createApp } from "../src/index.js";

const app = createApp();

/**
 * Vercel serverless entrypoint.
 *
 * src/server.js opens the Mongo connection before it listens; nothing did that
 * here, so the deployed API served every query from an unconnected mongoose
 * instance ("buffering timed out"). Serverless has no bootstrap step, so the
 * connection is ensured per container: awaited before the request reaches
 * Express, opened once, and retried on the next request after a failure.
 */
let dbReady = null;
function ensureDb() {
  if (!dbReady) {
    dbReady = connectDB().catch((error) => {
      dbReady = null;
      console.error(`[db] MongoDB connection failed: ${error.message}`);
      return false;
    });
  }
  return dbReady;
}

export default async function handler(req, res) {
  if (env.isProduction || env.isDevelopment) {
    await ensureDb();
  }
  return app(req, res);
}
