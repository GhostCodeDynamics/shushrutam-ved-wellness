import { AppError, validationError } from "../utils/AppError.js";
import { cleanOptionalString, cleanString } from "../utils/sanitize.js";

const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validatePhone(value) {
  const cleaned = cleanString(value, { max: 20 });
  if (!cleaned) {
    throw validationError("Phone number is required", [{ field: "phone", message: "Required" }]);
  }
  if (!PHONE_RE.test(cleaned)) {
    throw validationError("Phone number looks invalid", [{ field: "phone", message: "Invalid format" }]);
  }
  return cleaned;
}

export function validateOptionalEmail(value) {
  const cleaned = cleanOptionalString(value, { max: 200 });
  if (cleaned === undefined) return undefined;
  if (!EMAIL_RE.test(cleaned)) {
    throw validationError("Email address looks invalid", [{ field: "email", message: "Invalid format" }]);
  }
  return cleaned.toLowerCase();
}

export function validateOptionalDate(value) {
  const cleaned = cleanOptionalString(value, { max: 20 });
  if (cleaned === undefined) return undefined;
  if (!DATE_RE.test(cleaned) || Number.isNaN(new Date(`${cleaned}T00:00:00Z`).getTime())) {
    throw validationError("Preferred date must be a valid YYYY-MM-DD date", [
      { field: "preferredDate", message: "Invalid date" },
    ]);
  }
  return cleaned;
}

export function assertAppointmentPayload(body) {
  if (!body || typeof body !== "object") {
    throw new AppError("Request body is required", 400);
  }

  const name = cleanString(body.name, { max: 120 });
  if (!name) {
    throw validationError("Full name is required", [{ field: "name", message: "Required" }]);
  }

  const phone = validatePhone(body.phone);
  const email = validateOptionalEmail(body.email);
  const preferredDate = validateOptionalDate(body.preferredDate);
  const preferredTime = cleanOptionalString(body.preferredTime, { max: 120 });
  const service = cleanOptionalString(body.service, { max: 200 });
  const message = cleanOptionalString(body.message, { max: 4000 });

  // Consent is required by the form and by policy (GDPR-style contact consent).
  if (body.consent !== true && body.consent !== "true") {
    throw validationError("Consent is required to contact you", [
      { field: "consent", message: "Required" },
    ]);
  }

  return { name, phone, email, preferredDate, preferredTime, service, message, consent: true };
}