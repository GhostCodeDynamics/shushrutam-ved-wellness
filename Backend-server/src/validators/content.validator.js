import { CONDITION_GROUPS } from "../models/index.js";
import { AppError, validationError } from "../utils/AppError.js";
import { cleanBoolean, cleanString } from "../utils/sanitize.js";

function assertTitle(body, result) {
  if (body.title !== undefined) {
    const title = cleanString(body.title, { max: 200 });
    if (!title) {
      throw validationError("Title is required", [{ field: "title", message: "Required" }]);
    }
    result.title = title;
  }
  return result.title;
}

function assertActiveAndOrder(body, result) {
  if (body.isActive !== undefined) {
    const active = cleanBoolean(body.isActive);
    if (active === undefined) {
      throw validationError("isActive must be a boolean", [{ field: "isActive", message: "Invalid" }]);
    }
    result.isActive = active;
  }
  if (body.sortOrder !== undefined) {
    const n = Number(body.sortOrder);
    result.sortOrder = Number.isFinite(n) ? Math.trunc(n) : 0;
  }
}

export function assertServicePayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") throw new AppError("Request body is required", 400);
  const result = {};
  assertTitle(body, result);
  if (body.description !== undefined) result.description = cleanString(body.description, { max: 1000 });
  if (body.icon !== undefined) result.icon = cleanString(body.icon, { max: 80 });
  assertActiveAndOrder(body, result);
  if (!partial && !result.title) {
    throw validationError("Title is required", [{ field: "title", message: "Required" }]);
  }
  return result;
}

export function assertConditionPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") throw new AppError("Request body is required", 400);
  const result = {};
  assertTitle(body, result);
  if (body.group !== undefined) {
    const group = cleanString(body.group, { max: 200 });
    if (!CONDITION_GROUPS.includes(group)) {
      throw validationError("Invalid condition group", [
        { field: "group", message: `Must be one of: ${CONDITION_GROUPS.join(", ")}` },
      ]);
    }
    result.group = group;
  }
  assertActiveAndOrder(body, result);
  if (!partial && !result.title) {
    throw validationError("Title is required", [{ field: "title", message: "Required" }]);
  }
  return result;
}

export function assertFaqPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") throw new AppError("Request body is required", 400);
  const result = {};
  if (body.question !== undefined) {
    const question = cleanString(body.question, { max: 300 });
    if (!question) {
      throw validationError("Question is required", [{ field: "question", message: "Required" }]);
    }
    result.question = question;
  }
  if (body.answer !== undefined) {
    const answer = cleanString(body.answer, { max: 3000 });
    if (!answer) {
      throw validationError("Answer is required", [{ field: "answer", message: "Required" }]);
    }
    result.answer = answer;
  }
  assertActiveAndOrder(body, result);
  if (!partial && (!result.question || !result.answer)) {
    throw validationError("Question and answer are required", []);
  }
  return result;
}

export function assertConditionGroupPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") throw new AppError("Request body is required", 400);
  const result = {};
  if (body.name !== undefined) {
    const name = cleanString(body.name, { max: 200 });
    if (!name) {
      throw validationError("Name is required", [{ field: "name", message: "Required" }]);
    }
    result.name = name;
  }
  if (body.description !== undefined) result.description = cleanString(body.description, { max: 1000 });
  if (body.sortOrder !== undefined) {
    const n = Number(body.sortOrder);
    result.sortOrder = Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  if (!partial && !result.name) {
    throw validationError("Name is required", [{ field: "name", message: "Required" }]);
  }
  return result;
}