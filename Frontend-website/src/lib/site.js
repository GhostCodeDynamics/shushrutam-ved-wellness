/**
 * Single source of truth for the site origin.
 *
 * `VITE_SITE_URL` (build-time, see .env.example) wins. When it is not set the
 * runtime origin is used, so local builds resolve to localhost and production
 * builds always resolve to the domain serving them — never a placeholder.
 */
const configured = (import.meta.env.VITE_SITE_URL || "").trim().replace(/\/$/, "");
const runtimeOrigin =
  typeof window !== "undefined" && window.location?.origin ? window.location.origin : "";

export const SITE_URL = configured || runtimeOrigin;

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
