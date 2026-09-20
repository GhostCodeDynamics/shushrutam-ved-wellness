const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function cleanString(value, { max = 4000, trim = true } = {}) {
  if (value === undefined || value === null) return "";
  const cleaned = String(value).replace(CONTROL_RE, "").replace(/\u200B/g, "");
  const trimmed = trim ? cleaned.trim() : cleaned;
  return trimmed.slice(0, max);
}

export function cleanOptionalString(value, { max = 4000 } = {}) {
  const cleaned = cleanString(value, { max });
  return cleaned === "" ? undefined : cleaned;
}

export function cleanBoolean(value) {
  if (value === true || value === "true" || value === 1 || value === "1") return true;
  if (value === false || value === "false" || value === 0 || value === "0") return false;
  return undefined;
}

export function cleanNumber(value, { min, max, fallback = 0 } = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  if (min !== undefined && n < min) return min;
  if (max !== undefined && n > max) return max;
  return Math.trunc(n);
}

export function cleanArrayOfStrings(value, { maxItems = 200, maxLength = 500 } = {}) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, { max: maxLength }))
    .filter(Boolean)
    .slice(0, maxItems);
}