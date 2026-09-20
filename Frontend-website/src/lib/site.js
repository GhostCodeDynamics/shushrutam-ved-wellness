export const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:4000/api" : "/api")
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL || "/";
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!SITE_URL) return clean;
  return `${SITE_URL}${clean}`;
}
