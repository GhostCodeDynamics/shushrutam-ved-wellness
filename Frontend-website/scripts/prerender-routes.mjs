import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Copies the built SPA shell into a real file for every URL in the generated
 * sitemap, plus a 404.html fallback.
 *
 * Why this exists: Vercel answers deep links (`/blog`, `/blog/:slug`,
 * `/privacy`, ...) with its own `404 NOT_FOUND` page, because the `rewrites`
 * in vercel.json never take effect on these projects — verified live while the
 * `headers` from that very same file were applied. Real files make every
 * routable URL exist for real, so deep links return 200 on any static host and
 * never depend on rewrite configuration.
 *
 * URLs that are *not* prerendered (unknown slugs, typos) fall through to
 * 404.html, which boots the same SPA and renders the branded noindex 404.
 *
 * Runs automatically after every build (`postbuild`); the sitemap it reads is
 * written by `prebuild`, so the sitemap and the served routes cannot drift.
 */

const dist = resolve(process.cwd(), "dist");
const shellPath = resolve(dist, "index.html");
const sitemapPath = resolve(dist, "sitemap.xml");

if (!existsSync(shellPath) || !existsSync(sitemapPath)) {
  console.error(
    "[prerender] dist/index.html or dist/sitemap.xml is missing — run `npm run build` so prebuild generates the sitemap.",
  );
  process.exit(1);
}

const shell = readFileSync(shellPath, "utf8");
const locs = [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].trim(),
);

const routes = new Set();
for (const loc of locs) {
  try {
    // "/blog/some-slug/" -> "/blog/some-slug"; "/" -> "" (already the root file)
    const pathname = new URL(loc).pathname.replace(/\/+$/, "");
    if (pathname && !pathname.endsWith(".xml") && !pathname.endsWith(".html")) {
      routes.add(pathname);
    }
  } catch {
    console.warn(`[prerender] Skipping unparsable <loc>: ${loc}`);
  }
}

const written = [];
for (const route of routes) {
  const rel = route.slice(1); // "blog/some-slug"
  // Directory URL:  /blog/some-slug -> dist/blog/some-slug/index.html
  const dirFile = resolve(dist, rel, "index.html");
  mkdirSync(dirname(dirFile), { recursive: true });
  writeFileSync(dirFile, shell, "utf8");
  // cleanUrls maps /blog/some-slug -> dist/blog/some-slug.html (same shell,
  // written as well so both lookup orders resolve to the SPA).
  const flatFile = resolve(dist, `${rel}.html`);
  mkdirSync(dirname(flatFile), { recursive: true });
  writeFileSync(flatFile, shell, "utf8");
  written.push(route);
}

writeFileSync(resolve(dist, "404.html"), shell, "utf8");

console.log(
  `[prerender] Wrote ${written.length} route shells (${written
    .slice(0, 3)
    .join(", ")}${written.length > 3 ? ", …" : ""}) + 404.html`,
);
