/**
 * Media helpers — the single place for CDN image URLs and display transforms.
 *
 * Static site photography lives on ImageKit (uploaded once; originals are the
 * fallback for social scrapers which ignore `tr`). Use `ik()` at render points
 * to get an on-the-fly, format-negotiated, width-capped derivative. It leaves
 * non-ImageKit URLs (e.g. /og-image.png fallback) and already-transformed
 * URLs untouched, so it is safe on any image field.
 */
const IK = "https://ik.imagekit.io/itidhtbzz";

/** Static photography (folder `site` on ImageKit). */
export const SITE_IMAGES = {
  hero: `${IK}/site/doctor-hero-client_xB3NjP6Fk.jpg`,
  aboutDoctor: `${IK}/site/about-doctor-image_KHaY9Lobu.jpg`,
  aboutNature: `${IK}/site/about-nature_EC85tk31o.jpg`,
  naturopathy: `${IK}/site/naturopathy-consultation_m5FRurF-w.jpg`,
  leafTexture: `${IK}/site/leaf-texture_udC7EMZeE.jpg`,
};

/**
 * Append an ImageKit transform for <img> display: capped width, WebP/AVIF
 * negotiation (f-auto), quality 80. No-op for non-ImageKit or already
 * transformed URLs.
 * @param {string} url image URL
 * @param {number} width max render width in px (2x for retina where it matters)
 * @returns {string}
 */
export function ik(url, width) {
  if (!url || !url.startsWith(IK) || url.includes("?tr=")) return url;
  return `${url}?tr=w-${width},f-auto,q-80`;
}
