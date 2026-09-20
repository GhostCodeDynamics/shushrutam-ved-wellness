import { Router } from "express";

import { isDbConnected } from "../config/db.js";
import { env } from "../config/env.js";
import adminRoutes from "./admin.routes.js";
import appointmentRoutes from "./appointment.routes.js";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import contentRoutes from "./content.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    db: isDbConnected() ? "connected" : "unavailable",
    environment: env.isProduction ? "production" : env.NODE_ENV,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/blog", blogRoutes);
router.use("/", contentRoutes);
router.use("/admin", adminRoutes);

export default router;