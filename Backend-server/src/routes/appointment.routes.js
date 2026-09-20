import { Router } from "express";
import rateLimit from "express-rate-limit";

import { create, lookupByRef } from "../controllers/appointment.controller.js";

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many appointment requests", message: "Please try again later." },
});

const lookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many lookups", message: "Please try again later." },
});

const router = Router();

router.post("/", createLimiter, create);
router.get("/:ref", lookupLimiter, lookupByRef);

export default router;