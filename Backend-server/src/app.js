import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "./config/env.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", env.trustProxy);
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'none'"],
        },
      },
    }),
  );
  app.disable("x-powered-by");

  app.use(
    cors({
      origin(origin, callback) {
        // Development/test: any origin is fine (localhost, LAN IP for phone
        // testing, Vite preview, etc.). Production stays strictly allowlisted.
        if (!env.isProduction) return callback(null, true);
        if (!origin || env.corsOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("Origin not allowed by CORS"));
      },
      credentials: true,
    }),
  );

  app.use("/api/admin/images", express.json({ limit: "8mb" }));
  app.use(express.json({ limit: "300kb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression({ threshold: 0 }));

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many requests", message: "Please try again later." },
    }),
  );

  app.use(
    "/api/admin",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many admin requests", message: "Please try again later." },
    }),
  );

  app.use("/api", routes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}