import { createServer } from "node:http";

import "./config/resolver.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { createApp } from "./app.js";

async function main() {
  if (env.isProduction || env.isDevelopment) {
    await connectDB();
  }

  const app = createApp();
  const server = createServer(app);

  server.listen(env.port, () => {
    console.log(`[server] ShushrutamVed Care API listening on http://localhost:${env.port} (${env.NODE_ENV})`);
  });

  const shutdown = (signal) => {
    console.log(`[server] ${signal} received — shutting down`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[server] Uncaught exception:", error);
  process.exit(1);
});

main().catch((error) => {
  console.error("[server] Failed to start:", error.message);
  process.exit(1);
});