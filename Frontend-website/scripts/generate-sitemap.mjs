import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Generates public/sitemap.xml (and updates robots.txt) before every build.
 * Reads SITE_URL from the environment. The final public domain is a client input —
 * if not provided, a clear placeholder is used so hosts/verification are never tricked.
 */

const PLACEHOLDER = "https://shushrutamvedcare.example.com";

const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "") || PLACEHOLDER;

if (siteUrl === PLACEHOLDER) {
  console.warn(
    "[sitemap] SITE_URL not set — using placeholder domain. Set SITE_URL before production build.",
  );
}

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
    <loc>${siteUrl}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n");

const apiBase = (process.env.SITEMAP_API_URL || "").replace(/\/$/, "");
let postEntries = "";
let postCount = 0;

if (apiBase) {
  try {
    const response = await fetch(`${apiBase}/blog`, { signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      const { items = [] } = await response.json();
      const seen = new Set();
      postEntries = items
        .filter((p) => p && p.slug && !seen.has(p.slug) && seen.add(p.slug))
        .map((p) => {
          const lastmod = p.publishDate ? String(p.publishDate).slice(0, 10) : today;
          return `  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`;
        })
        .join("\n");
      postCount = seen.size;
    }
  } catch (error) {
    console.warn(`[sitemap] Could not fetch posts from ${apiBase}: ${error.message}`);
  }
}

const combined = [urls, postEntries].filter(Boolean).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${combined}
</urlset>
`;

writeFileSync(resolve(process.cwd(), "public/sitemap.xml"), sitemap, "utf8");
console.log(
  `[sitemap] Wrote public/sitemap.xml with ${pages.length + postCount} URLs (${siteUrl})${postCount ? ` — ${postCount} posts merged from ${apiBase}` : ""}`,
);

const robotsPath = resolve(process.cwd(), "public/robots.txt");
let robots = readFileSync(robotsPath, "utf8");
robots = robots.replace(/Sitemap: .*/g, `Sitemap: ${siteUrl}/sitemap.xml`);
if (!robots.includes("Sitemap:")) {
  robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`;
}
writeFileSync(robotsPath, robots, "utf8");
console.log(`[sitemap] Updated Sitemap directive in public/robots.txt`);
