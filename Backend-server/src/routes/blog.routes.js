import { Router } from "express";

import {
  detailPublic,
  listPublic,
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/", listPublic);
router.get("/:slug", detailPublic);

export default router;