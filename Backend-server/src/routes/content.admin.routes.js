import { Router } from "express";

import {
  adminConditionsList,
  adminConditionCreate,
  adminConditionDelete,
  adminConditionUpdate,
  adminClinicGet,
  adminClinicUpdate,
  adminFaqCreate,
  adminFaqDelete,
  adminFaqUpdate,
  adminFaqsList,
  adminGroupCreate,
  adminServiceCreate,
  adminServiceDelete,
  adminServiceUpdate,
  adminServicesList,
} from "../controllers/content.controller.js";

const router = Router();

// Services
router.get("/services", adminServicesList);
router.post("/services", adminServiceCreate);
router.patch("/services/:id", adminServiceUpdate);
router.delete("/services/:id", adminServiceDelete);

// Conditions + groups
router.get("/conditions", adminConditionsList);
router.post("/conditions", adminConditionCreate);
router.patch("/conditions/:id", adminConditionUpdate);
router.delete("/conditions/:id", adminConditionDelete);
router.post("/condition-groups", adminGroupCreate);

// FAQs
router.get("/faqs", adminFaqsList);
router.post("/faqs", adminFaqCreate);
router.patch("/faqs/:id", adminFaqUpdate);
router.delete("/faqs/:id", adminFaqDelete);

// Clinic settings
router.get("/clinic", adminClinicGet);
router.patch("/clinic", adminClinicUpdate);

export default router;