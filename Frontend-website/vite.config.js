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
 */
function siteOriginHtml() {
  return {
    name: "site-origin-html",
    transformIndexHtml(html, ctx) {
      const env = loadEnv(ctx.mode, process.cwd(), "");
      const origin =
        (env.VITE_SITE_URL || env.SITE_URL || "").trim().replace(/\/$/, "") || DEFAULT_SITE_ORIGIN;
      return html.replaceAll("%SITE_ORIGIN%", origin);
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
