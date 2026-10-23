import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Copies the built SPA shell into a real file for every URL in the generated
 * sitemap, plus a 404.html fallback — and injects a unique <head> (title,
 * description, canonical, Open Graph, Twitter, article dates) into each copy.
 *
 * Why real files: Vercel answers deep links (`/blog`, `/blog/:slug`,
 * `/privacy`, ...) with its own `404 NOT_FOUND` page, because the `rewrites`
 * in vercel.json never take effect on these projects — verified live while the
 * `headers` from that very same file were applied. Real files make every
 * routable URL exist for real, so deep links return 200 on any static host and
 * never depend on rewrite configuration.
 *
 * Why per-route <head>: the runtime fixes metas client-side (see
 * src/lib/seo-head.js), but social scrapers (WhatsApp, Twitter, LinkedIn,
 * Slack) and audit crawlers never run JavaScript — they used to see the
 * homepage title and og:url on every single page. Injecting the same values
 * the <Seo> components set keeps the static document truthful; the runtime
 * upserts the identical values, so there is no conflict or duplication. The
 * single data-seo="true" JSON-LD slot is intentionally left for the runtime,
 * which owns schema generation.
 *
 * Blog posts get their title/description/image/dates from the live API (the
 * same endpoint prebuild used for the sitemap). If the API is unreachable the
 * build still succeeds: those routes fall back to the generic shell exactly as
 * before, and the next deploy fixes them.
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

loadDotEnv();

const DEFAULT_LOCAL_ORIGIN = "http://localhost:5173";
const LOCAL_API = "http://localhost:4000/api";
const SITE_NAME = "ShushrutamVed Care";
const FALLBACK_OG_IMAGE = "/og-image.png";
const DEFAULT_OG_ALT = `${SITE_NAME} — naturopathy and holistic wellness clinic in Bhopal`;

const origin = (process.env.VITE_SITE_URL || process.env.SITE_URL || "").trim().replace(/\/$/, "");

/**
 * Static-route metas — copied verbatim from the <Seo> props in src/pages/*.
 * When a page's Seo props change, update this map in the same commit so the
 * static document and the runtime never disagree.
 */
const PAGE_SEO = {
  "/": {
    title: `Naturopathy in Bhopal by Dr. Aarti Sen | ${SITE_NAME}`,
    description:
      "ShushrutamVed Care | Naturopathy & Holistic Wellness Clinic in Bhopal by Dr. Aarti Sen – root-cause care for weight, hormones, PCOS, digestion & more.",
    imageAlt: DEFAULT_OG_ALT,
  },
  "/about": {
    title: `About Dr. Aarti Sen | ${SITE_NAME} Bhopal`,
    description:
      "Meet Dr. Aarti Sen, M.Sc. Biotechnology — 6+ years of holistic wellness, naturopathy, Ayurveda and clinical nutrition care at ShushrutamVed Care in Bhopal.",
    imageAlt: "Dr. Aarti Sen, holistic wellness practitioner at ShushrutamVed Care in Bhopal",
  },
  "/services": {
    title: `Holistic Wellness Services in Bhopal | ${SITE_NAME}`,
    description:
      "Naturopathy, Ayurveda, yoga therapy, Panchakarma and nutrition programmes in Bhopal — personalised plans for weight, hormones, gut health and everyday energy.",
    imageAlt: "Holistic wellness and naturopathy services at ShushrutamVed Care, Bhopal",
  },
  "/conditions": {
    title: `Conditions We Treat | ${SITE_NAME} Bhopal`,
    description:
      "Naturopathy in Bhopal for PCOS, thyroid, diabetes, weight, acidity, constipation, back and knee pain, migraine, stress and sleep — natural, root-cause care.",
    imageAlt:
      "Naturopathy and lifestyle care for metabolic, hormonal and digestive conditions in Bhopal",
  },
  "/blog": {
    title: `Wellness Blog by Dr. Aarti Sen | ${SITE_NAME}`,
    description:
      "Practical notes by Dr. Aarti Sen on PCOS, thyroid, gut health, sleep, weight and stress — holistic wellness guidance from our naturopathy clinic in Bhopal.",
    imageAlt: "Wellness journal by Dr. Aarti Sen at ShushrutamVed Care, Bhopal",
  },
  "/faq": {
    title: `Frequently Asked Questions | ${SITE_NAME}`,
    description:
      "Answers on naturopathy consultations in Bhopal, timelines, online appointments, nutrition plans and combining holistic wellness care with your medication.",
    imageAlt: "Frequently asked questions about naturopathy care at ShushrutamVed Care, Bhopal",
  },
  "/appointment": {
    title: `Book a Naturopathy Consultation | ${SITE_NAME}`,
    description:
      "Book a naturopathy consultation with Dr. Aarti Sen in Bhopal or online. Personalised holistic wellness plans for weight, hormones, digestion and stress.",
    imageAlt: "Book a naturopathy consultation with Dr. Aarti Sen at ShushrutamVed Care, Bhopal",
  },
  "/contact": {
    title: `Contact & Visit Us | ${SITE_NAME}, Bhopal`,
    description:
      "Visit ShushrutamVed Care, B/86 OM Nagar, Kolar Road, Bhopal — clinic address, map and opening hours. Call +91 6260520932 for holistic care with Dr. Aarti Sen.",
    imageAlt: "ShushrutamVed Care naturopathy clinic on Kolar Road, Bhopal",
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "How ShushrutamVed Care collects, uses, stores and protects patient information shared through consultations, appointment enquiries and website contact forms.",
  },
  "/terms": {
    title: `Terms of Service | ${SITE_NAME}`,
    description:
      "Terms of use for the ShushrutamVed Care website — scope of holistic wellness services, appointment enquiries, payments, intellectual property and liability.",
  },
  "/disclaimer": {
    title: `Medical Disclaimer | ${SITE_NAME}`,
    description:
      "ShushrutamVed Care's medical disclaimer — our website provides educational wellness information and is not a substitute for medical advice or emergency care.",
  },
};

const shell = readFileSync(shellPath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");

const routes = new Set();
for (const loc of [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())) {
  try {
    // "/blog/some-slug/" -> "/blog/some-slug"; "/" -> "" (root handled separately)
    const pathname = new URL(loc).pathname.replace(/\/+$/, "");
    if (pathname && !pathname.endsWith(".xml") && !pathname.endsWith(".html")) {
      routes.add(pathname);
    }
  } catch {
    console.warn(`[prerender] Skipping unparsable <loc>: ${loc}`);
  }
}

// Published-post metas from the API so each article's static head (title,
// description, og:image, dates) matches what the SPA renders. Same env
// precedence as generate-sitemap.mjs. Failure is non-fatal: those routes keep
// the generic shell and the next build retries.
const postSeo = new Map();
const configuredApi = (process.env.SITEMAP_API_URL || "").trim().replace(/\/$/, "");
const clientApi = (process.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const apiBase =
  configuredApi ||
  (clientApi.startsWith("http") ? clientApi : "") ||
  (origin === DEFAULT_LOCAL_ORIGIN || !origin ? LOCAL_API : "");

if (apiBase) {
  try {
    const response = await fetch(`${apiBase}/blog`, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { items = [] } = await response.json();
    for (const post of items) {
      if (!post?.slug) continue;
      postSeo.set(`/blog/${post.slug}`, {
        title: `${post.seoTitle || post.title || ""} | ${SITE_NAME}`,
        description: post.seoDescription || post.excerpt || "",
        image: post.featuredImage || "",
        imageAlt: post.imageAlt || post.title || "",
        type: "article",
        publishedTime: post.publishDate ? String(post.publishDate).slice(0, 10) : "",
        author: "",
        section: post.category || "",
      });
    }
    console.log(`[prerender] Fetched SEO data for ${postSeo.size} published posts from ${apiBase}`);
  } catch (error) {
    console.warn(
      `[prerender] Could not fetch post SEO data from ${apiBase} (${error.message}) — blog routes ship with the generic shell this build.`,
    );
  }
} else {
  console.warn("[prerender] SITEMAP_API_URL not set — blog routes ship with the generic shell.");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function upsertMeta(html, attr, key, value) {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function removeMeta(html, attr, key) {
  const re = new RegExp(`\\s*<meta[^>]*${attr}="${key}"[^>]*/?>`, "i");
  return html.replace(re, "");
}

/**
 * Rewrites the static <head> so non-JS consumers (social scrapers, audit
 * crawlers, secondary indexes) see this route's real identity. Values mirror
 * src/lib/seo-head.js exactly.
 */
function injectHead(
  html,
  {
    title,
    description,
    path,
    image = "",
    imageAlt = "",
    type = "website",
    publishedTime = "",
    section = "",
  },
) {
  const canonical = `${origin}${path === "/" ? "/" : path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${origin}${image}`
    : `${origin}${FALLBACK_OG_IMAGE}`;
  const ogAlt = imageAlt || DEFAULT_OG_ALT;

  let out = html;
  out = out.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = upsertMeta(out, "name", "description", description);
  out = upsertMeta(out, "property", "og:title", title);
  out = upsertMeta(out, "property", "og:description", description);
  out = upsertMeta(out, "property", "og:url", canonical);
  out = upsertMeta(out, "property", "og:type", type);
  out = upsertMeta(out, "property", "og:image", ogImage);
  out = upsertMeta(out, "property", "og:image:alt", ogAlt);
  out = upsertMeta(out, "name", "twitter:title", title);
  out = upsertMeta(out, "name", "twitter:description", description);
  out = upsertMeta(out, "name", "twitter:image", ogImage);
  out = upsertMeta(out, "name", "twitter:image:alt", ogAlt);

  if (ogImage.endsWith(FALLBACK_OG_IMAGE)) {
    out = upsertMeta(out, "property", "og:image:type", "image/png");
    out = upsertMeta(out, "property", "og:image:width", "1200");
    out = upsertMeta(out, "property", "og:image:height", "630");
  } else {
    out = removeMeta(out, "property", "og:image:type");
    out = removeMeta(out, "property", "og:image:width");
    out = removeMeta(out, "property", "og:image:height");
  }

  if (publishedTime) {
    out = upsertMeta(out, "property", "article:published_time", publishedTime);
  }
  if (section) {
    out = upsertMeta(out, "property", "article:section", section);
  }
  if (!/rel="canonical"/.test(out)) {
    out = out.replace(
      "</head>",
      `  <link rel="canonical" href="${escapeHtml(canonical)}" />\n  </head>`,
    );
  }
  return out;
}

// Root: rewrite dist/index.html itself with the home metas (the runtime home
// title differs from the hand-written shell default — keep one truth).
const homeSeo = PAGE_SEO["/"];
if (homeSeo && origin) {
  writeFileSync(shellPath, injectHead(shell, { ...homeSeo, path: "/" }), "utf8");
}

const written = [];
let injected = 0;
for (const route of routes) {
  const seo = PAGE_SEO[route] || postSeo.get(route);
  const fileShell = seo && origin ? injectHead(shell, { ...seo, path: route }) : shell;
  if (seo && origin) injected += 1;

  const rel = route.slice(1); // "blog/some-slug"
  // Directory URL:  /blog/some-slug -> dist/blog/some-slug/index.html
  const dirFile = resolve(dist, rel, "index.html");
  mkdirSync(dirname(dirFile), { recursive: true });
  writeFileSync(dirFile, fileShell, "utf8");
  // cleanUrls maps /blog/some-slug -> dist/blog/some-slug.html (same shell,
  // written as well so both lookup orders resolve to the SPA).
  const flatFile = resolve(dist, `${rel}.html`);
  mkdirSync(dirname(flatFile), { recursive: true });
  writeFileSync(flatFile, fileShell, "utf8");
  written.push(route);
}

writeFileSync(resolve(dist, "404.html"), shell, "utf8");

console.log(
  `[prerender] Wrote ${written.length} route shells (${written
    .slice(0, 3)
    .join(
      ", ",
    )}${written.length > 3 ? ", …" : ""}) + 404.html — ${injected} with per-route SEO heads`,
);

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
