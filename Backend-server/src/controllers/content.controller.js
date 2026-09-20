import {
  ClinicSettings,
  Condition,
  ConditionGroup,
  Faq,
  Service,
} from "../models/index.js";
import { AppError, conflictError, notFoundError } from "../utils/AppError.js";
import { cleanString } from "../utils/sanitize.js";
import {
  assertConditionGroupPayload,
  assertConditionPayload,
  assertFaqPayload,
  assertServicePayload,
} from "../validators/content.validator.js";

const ORDERED = { sortOrder: 1, createdAt: 1 };

function adminService(doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    description: doc.description || "",
    icon: doc.icon || "",
    isActive: doc.isActive,
    sortOrder: doc.sortOrder,
    createdAt: doc.createdAt,
  };
}

function adminCondition(doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    group: doc.group,
    description: doc.description || "",
    isActive: doc.isActive,
    sortOrder: doc.sortOrder,
    createdAt: doc.createdAt,
  };
}

function adminConditionGroup(doc) {
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description || "",
    sortOrder: doc.sortOrder,
  };
}

function adminFaq(doc) {
  return {
    id: String(doc._id),
    question: doc.question,
    answer: doc.answer,
    isActive: doc.isActive,
    sortOrder: doc.sortOrder,
    createdAt: doc.createdAt,
  };
}

/* ---------------- Public ---------------- */

export async function listServices(req, res, next) {
  try {
    const items = await Service.find({ isActive: true }).sort(ORDERED).lean();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function listConditions(req, res, next) {
  try {
    const [groups, conditions] = await Promise.all([
      ConditionGroup.find().sort({ sortOrder: 1, createdAt: 1 }).lean(),
      Condition.find({ isActive: true }).sort(ORDERED).lean(),
    ]);
    res.json({
      groups: groups.map((g) => ({ name: g.name, description: g.description || "" })),
      items: conditions.map((c) => ({ title: c.title, group: c.group })),
    });
  } catch (error) {
    next(error);
  }
}

export async function listFaqs(req, res, next) {
  try {
    const items = await Faq.find({ isActive: true }).sort(ORDERED).lean();
    res.json({ items: items.map((f) => ({ question: f.question, answer: f.answer })) });
  } catch (error) {
    next(error);
  }
}

export async function getClinic(req, res, next) {
  try {
    const settings = await ClinicSettings.findOne().lean();
    if (!settings) return res.json({ settings: {} });
    res.json({ settings: clinicPublic(settings) });
  } catch (error) {
    next(error);
  }
}

/* ---------------- Admin: services ---------------- */

export async function adminServicesList(req, res, next) {
  try {
    const items = await Service.find().sort(ORDERED).lean();
    res.json({ items: items.map(adminService) });
  } catch (error) {
    next(error);
  }
}

export async function adminServiceCreate(req, res, next) {
  try {
    const payload = assertServicePayload(req.body);
    const item = await Service.create(payload);
    res.status(201).json({ item: adminService(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminServiceUpdate(req, res, next) {
  try {
    const item = await Service.findById(req.params.id);
    if (!item) return next(notFoundError("Service"));
    Object.assign(item, assertServicePayload(req.body, { partial: true }));
    await item.save();
    res.json({ item: adminService(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminServiceDelete(req, res, next) {
  try {
    const item = await Service.findByIdAndDelete(req.params.id);
    if (!item) return next(notFoundError("Service"));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/* ---------------- Admin: conditions + groups ---------------- */

export async function adminConditionsList(req, res, next) {
  try {
    const [groups, conditions] = await Promise.all([
      ConditionGroup.find().sort({ sortOrder: 1 }).lean(),
      Condition.find().sort(ORDERED).lean(),
    ]);
    res.json({ groups: groups.map(adminConditionGroup), items: conditions.map(adminCondition) });
  } catch (error) {
    next(error);
  }
}

export async function adminConditionCreate(req, res, next) {
  try {
    await ensureGroupExists(req.body.group);
    const payload = assertConditionPayload(req.body);
    const item = await Condition.create(payload);
    res.status(201).json({ item: adminCondition(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminConditionUpdate(req, res, next) {
  try {
    const item = await Condition.findById(req.params.id);
    if (!item) return next(notFoundError("Condition"));
    const payload = assertConditionPayload(req.body, { partial: true });
    if (payload.group) await ensureGroupExists(payload.group);
    Object.assign(item, payload);
    await item.save();
    res.json({ item: adminCondition(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminConditionDelete(req, res, next) {
  try {
    const item = await Condition.findByIdAndDelete(req.params.id);
    if (!item) return next(notFoundError("Condition"));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function adminGroupCreate(req, res, next) {
  try {
    const payload = assertConditionGroupPayload(req.body);
    try {
      const group = await ConditionGroup.create(payload);
      return res.status(201).json({ group: adminConditionGroup(group) });
    } catch (error) {
      if (error?.code === 11000) throw conflictError("A group with this name already exists");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function ensureGroupExists(groupName) {
  if (!groupName) return;
  const existing = await ConditionGroup.findOne({ name: groupName });
  if (existing) return;
  await ConditionGroup.findOneAndUpdate(
    { name: groupName },
    { $setOnInsert: { name: groupName } },
    { upsert: true },
  );
}

/* ---------------- Admin: FAQs ---------------- */

export async function adminFaqsList(req, res, next) {
  try {
    const items = await Faq.find().sort(ORDERED).lean();
    res.json({ items: items.map(adminFaq) });
  } catch (error) {
    next(error);
  }
}

export async function adminFaqCreate(req, res, next) {
  try {
    const payload = assertFaqPayload(req.body);
    const item = await Faq.create(payload);
    res.status(201).json({ item: adminFaq(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminFaqUpdate(req, res, next) {
  try {
    const item = await Faq.findById(req.params.id);
    if (!item) return next(notFoundError("FAQ"));
    Object.assign(item, assertFaqPayload(req.body, { partial: true }));
    await item.save();
    res.json({ item: adminFaq(item) });
  } catch (error) {
    next(error);
  }
}

export async function adminFaqDelete(req, res, next) {
  try {
    const item = await Faq.findByIdAndDelete(req.params.id);
    if (!item) return next(notFoundError("FAQ"));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/* ---------------- Admin: clinic settings ---------------- */

export async function adminClinicGet(req, res, next) {
  try {
    const settings = await ClinicSettings.findOne().lean();
    if (!settings) return res.json({ settings: null });
    res.json({ settings: clinicPublic(settings) });
  } catch (error) {
    next(error);
  }
}

export async function adminClinicUpdate(req, res, next) {
  try {
    const body = req.body || {};
    const allowed = [
      "name",
      "tagline",
      "doctor",
      "qualification",
      "experience",
      "phone",
      "phoneHref",
      "whatsapp",
      "email",
      "address",
      "map",
      "hours",
      "social",
      "seoDefaults",
    ];
    const patch = {};
    for (const key of allowed) {
      if (body[key] !== undefined) {
        patch[key] = key === "hours" ? cleanHours(body.hours) : cleanString(body[key], { max: 2000 });
      }
    }
    if (body.social && typeof body.social === "object") {
      patch.social = Object.fromEntries(
        Object.entries(body.social).map(([k, v]) => [k, cleanString(v, { max: 500 })]),
      );
    }
    if (body.seoDefaults && typeof body.seoDefaults === "object") {
      patch.seoDefaults = Object.fromEntries(
        Object.entries(body.seoDefaults).map(([k, v]) => [k, cleanString(v, { max: 500 })]),
      );
    }

    let settings = await ClinicSettings.findOne();
    if (!settings) {
      settings = await ClinicSettings.create({ ...patch });
    } else {
      Object.assign(settings, patch);
      await settings.save();
    }
    res.json({ settings: clinicPublic(settings.toObject()) });
  } catch (error) {
    next(error);
  }
}

function cleanHours(hours) {
  if (!Array.isArray(hours)) return [];
  return hours
    .map((h) => ({
      day: cleanString(h?.day, { max: 60 }),
      time: cleanString(h?.time, { max: 120 }),
    }))
    .filter((h) => h.day && h.time)
    .slice(0, 14);
}

function clinicPublic(settings) {
  return {
    name: settings.name || "",
    tagline: settings.tagline || "",
    doctor: settings.doctor || "",
    qualification: settings.qualification || "",
    experience: settings.experience || "",
    phone: settings.phone || "",
    phoneHref: settings.phoneHref || "",
    whatsapp: settings.whatsapp || "",
    email: settings.email || "",
    address: settings.address || "",
    map: settings.map || "",
    hours: (settings.hours || []).map((h) => ({ day: h.day, time: h.time })),
    social: settings.social || {},
    seoDefaults: settings.seoDefaults || {},
  };
}