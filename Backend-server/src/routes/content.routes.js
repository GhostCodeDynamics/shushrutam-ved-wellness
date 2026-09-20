import { Router } from "express";

import {
  getClinic,
  listConditions,
  listFaqs,
  listServices,
} from "../controllers/content.controller.js";

const router = Router();

router.get("/services", listServices);
router.get("/conditions", listConditions);
router.get("/faqs", listFaqs);
router.get("/clinic", getClinic);

export default router;