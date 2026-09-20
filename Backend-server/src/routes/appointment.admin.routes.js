import { Router } from "express";

import {
  adminDelete,
  adminDetail,
  adminList,
  adminUpdate,
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/", adminList);
router.get("/:id", adminDetail);
router.patch("/:id", adminUpdate);
router.delete("/:id", adminDelete);

export default router;