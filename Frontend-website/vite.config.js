import { fileURLToPath, URL } from "node:url";
import process from "node:process";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_SITE_ORIGIN = "http://localhost:5173";

/**
 * Bakes the absolute site origin into the static index.html meta tags
 * (og:url / og:image). Social scrapers never run JS, so those two must be
 * absolute when the HTML is served. Single source of truth: VITE_SITE_URL
 * (see .env.example) — same value src/lib/site.js uses for canonical URLs.
 *
 * Also injects the Google Search Console verification tag when
 * VITE_GOOGLE_SITE_VERIFICATION is set — Google fetches raw HTML without JS,
 * so this has to be in the static document rather than added at runtime.
 * `*.vercel.app` cannot be verified with a DNS TXT record (Vercel owns the
 * zone), which is why the HTML-tag method is the supported one here.
 */
function siteOriginHtml() {
  return {
    name: "site-origin-html",
    transformIndexHtml(html, ctx) {
      const env = loadEnv(ctx.mode, process.cwd(), "");
      const origin =
        (env.VITE_SITE_URL || env.SITE_URL || "").trim().replace(/\/$/, "") || DEFAULT_SITE_ORIGIN;
      const verification = (env.VITE_GOOGLE_SITE_VERIFICATION || "").trim();
      const verificationTag = verification
        ? `<meta name="google-site-verification" content="${verification.replaceAll('"', "&quot;")}" />`
        : "";
      return html
        .replaceAll("%SITE_ORIGIN%", origin)
        .replaceAll("%GOOGLE_SITE_VERIFICATION%", verificationTag);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteOriginHtml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules") &&
            (id.includes("/react-router") || id.includes("/react-dom") || id.includes("/sonner"))
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
