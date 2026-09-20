import { Router } from "express";

import { setup } from "../controllers/auth.controller.js";
import { dashboard } from "../controllers/dashboard.controller.js";
import { adminUpload } from "../controllers/image.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import appointmentAdminRoutes from "./appointment.admin.routes.js";
import blogAdminRoutes from "./blog.admin.routes.js";
import contentAdminRoutes from "./content.admin.routes.js";

const router = Router();

// One-time first-admin creation, gated by BOOTSTRAP_SECRET. Must stay public.
router.post("/setup", setup);

// Everything below requires a valid admin JWT.
router.use(requireAuth);

router.get("/dashboard", dashboard);
router.post("/images", adminUpload);
router.use("/appointments", appointmentAdminRoutes);
router.use("/blog", blogAdminRoutes);
router.use("/", contentAdminRoutes);

export default router;