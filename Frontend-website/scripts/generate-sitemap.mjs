import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Generates public/sitemap.xml and refreshes the `Sitemap:` directive in
 * public/robots.txt.
 *
 * Runs automatically before every build (`prebuild`) and can be re-run by hand
 * after publishing posts in the admin panel:
 *
 *   VITE_SITE_URL=https://your-domain.example \
 *   SITEMAP_API_URL=https://api.your-domain.example/api \
 *   npm run sitemap
 *
 * Site origin — one value, two names for build vs client:
 *   VITE_SITE_URL  value baked into the client (canonical/og:url, see src/lib/site.js)
 *   SITE_URL       ops/build alias for the same origin (used if VITE_SITE_URL is empty)
 *
 * In CI/Vercel a missing origin fails the build, so neither the old placeholder
 * domain nor localhost can ever be published.
 */

const DEFAULT_LOCAL_ORIGIN = "http://localhost:5173";
const LOCAL_API = "http://localhost:4000/api";

loadDotEnv();

const isCi = Boolean(process.env.VERCEL || process.env.CI);
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "").trim().replace(/\/$/, "");

if (!siteUrl) {
  if (isCi) {
    console.error(
      "[sitemap] VITE_SITE_URL (or SITE_URL) is not set. Refusing to build with an unverified site origin — set it to your production domain.",
    );
    process.exit(1);
  }
  console.warn(
    `[sitemap] VITE_SITE_URL not set — using ${DEFAULT_LOCAL_ORIGIN} for this local build.`,
  );
}
const origin = siteUrl || DEFAULT_LOCAL_ORIGIN;

const pages = [
  "/",
  "/about",
  "/services",
  "/conditions",
  "/blog",
  "/faq",
  "/appointment",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
];

const today = new Date().toISOString().slice(0, 10);

const urls = pages
  .map(
    (p) => `  <url>
    <loc>${origin}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n");

// Published posts come from the API so a post appears in the sitemap as soon as
// it is published (SITEMAP_API_URL wins; VITE_API_BASE_URL is the same value the
// client uses; local builds fall back to the dev API).
const configuredApi = (process.env.SITEMAP_API_URL || "").trim().replace(/\/$/, "");
const clientApi = (process.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const apiBase =
  configuredApi ||
  (clientApi.startsWith("http") ? clientApi : "") ||
  (origin === DEFAULT_LOCAL_ORIGIN ? LOCAL_API : "");

let postEntries = "";
let postCount = 0;
let apiFailed = false;

if (apiBase) {
  try {
    // Generous: the Render free tier sleeps when idle and a cold start can take
    // ~45s, and on CI a timeout fails the build (a sitemap without posts must
    // never ship). Localhost fails fast when no dev API is running.
    const response = await fetch(`${apiBase}/blog`, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { items = [] } = await response.json();
    const seen = new Set();
    postEntries = items
      .filter((p) => p && p.slug && !seen.has(p.slug) && seen.add(p.slug))
      .map((p) => {
        const lastmod = p.publishDate ? String(p.publishDate).slice(0, 10) : today;
        return `  <url>
    <loc>${origin}/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`;
      })
      .join("\n");
    postCount = seen.size;
  } catch (error) {
    apiFailed = true;
    console.warn(`[sitemap] Could not fetch posts from ${apiBase}: ${error.message}`);
  }
} else {
  console.warn(
    "[sitemap] SITEMAP_API_URL not set — published posts will be missing from the sitemap.",
  );
}

if (apiFailed && isCi && configuredApi) {
  console.error(
    `[sitemap] ${configuredApi}/blog is unreachable but SITEMAP_API_URL is configured — refusing to ship a sitemap without posts.`,
  );
  process.exit(1);
}

const combined = [urls, postEntries].filter(Boolean).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${combined}
</urlset>
`;

writeFileSync(resolve(process.cwd(), "public/sitemap.xml"), sitemap, "utf8");
console.log(
  `[sitemap] Wrote public/sitemap.xml with ${pages.length + postCount} URLs (${origin})${
    postCount ? ` — ${postCount} published posts from ${apiBase}` : ""
  }`,
);

// robots.txt is only rewritten once a real origin is configured, so local
// builds never commit a localhost (or stale) Sitemap directive.
const robotsPath = resolve(process.cwd(), "public/robots.txt");
if (siteUrl && existsSync(robotsPath)) {
  let robots = readFileSync(robotsPath, "utf8");
  const directive = `Sitemap: ${siteUrl}/sitemap.xml`;
  // Match only a real directive line (the file's own comments may mention it).
  robots = /^Sitemap:\s*\S+/m.test(robots)
    ? robots.replace(/^Sitemap:.*$/m, directive)
    : `${robots.replace(/\s+$/, "")}\n${directive}\n`;
  writeFileSync(robotsPath, robots, "utf8");
  console.log("[sitemap] Updated the Sitemap directive in public/robots.txt");
} else if (!siteUrl) {
  console.log("[sitemap] Skipped public/robots.txt (no configured origin — local build only).");
}

/** Minimal .env reader so local VITE_SITE_URL/SITE_URL match what Vite loads. */
function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || match[2] === "") continue;
    if (match[1] in process.env) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}
