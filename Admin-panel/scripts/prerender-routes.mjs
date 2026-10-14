import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Copies the built SPA shell into a real file for every static admin route,
 * plus a 404.html fallback.
 *
 * Same reason as Frontend-website/scripts/prerender-routes.mjs: Vercel answers
 * deep links (`/login`, `/blog/new`, ...) with its own 404 page because the
 * `rewrites` in vercel.json never take effect on these projects — verified live
 * while the `headers` from that same file were applied. Real files make the
 * routes exist for real, independent of rewrite configuration.
 *
 * `/blog/:id` is intentionally not prerendered: ids only exist at runtime, so
 * those URLs fall through to 404.html, which boots the same SPA and matches
 * the route client-side.
 *
 * Runs automatically after every build (`postbuild`).
 */

const dist = resolve(process.cwd(), "dist");
const shellPath = resolve(dist, "index.html");

if (!existsSync(shellPath)) {
  console.error(
    "[prerender] dist/index.html is missing — run `npm run build`.",
  );
  process.exit(1);
}

const shell = readFileSync(shellPath, "utf8");

// Static routes — keep in sync with src/App.jsx <Routes>.
const ROUTES = [
  "/",
  "/login",
  "/appointments",
  "/blog",
  "/blog/new",
  "/content",
  "/clinic",
];

const written = [];
for (const route of ROUTES) {
  if (route === "/") continue; // dist/index.html already is the shell
  const rel = route.slice(1); // "blog/new"
  const dirFile = resolve(dist, rel, "index.html");
  mkdirSync(dirname(dirFile), { recursive: true });
  writeFileSync(dirFile, shell, "utf8");
  const flatFile = resolve(dist, `${rel}.html`);
  writeFileSync(flatFile, shell, "utf8");
  written.push(route);
}

writeFileSync(resolve(dist, "404.html"), shell, "utf8");

console.log(
  `[prerender] Wrote ${written.length} admin route shells + 404.html`,
);
