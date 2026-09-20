import { Router } from "express";

import {
  adminCreate,
  adminDelete,
  adminDetail,
  adminList,
  adminUpdate,
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/", adminList);
router.get("/:id", adminDetail);
router.post("/", adminCreate);
router.patch("/:id", adminUpdate);
router.delete("/:id", adminDelete);

export default router;