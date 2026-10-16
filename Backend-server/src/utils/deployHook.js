import { env } from "../config/env.js";

/**
 * Asks Vercel to rebuild the website after content changes that a static
 * build bakes in: `sitemap.xml` gains/loses a URL on publish/unpublish, and
 * the prerendered `/blog/<slug>` shell only exists after a build (see
 * Frontend-website/scripts/prerender-routes.mjs). Until that rebuild finishes
 * the URL still renders — served through 404.html — but answers with a 404
 * status and is missing from the sitemap.
 *
 * Fire-and-forget: publishing must never wait on, or fail because of, a
 * build. Rapid edits are coalesced — one request up front, one trailing
 * request after the cooldown — so the state that finally gets built is the
 * latest one rather than only the first change.
 *
 * Disabled entirely when VERCEL_DEPLOY_HOOK_URL is unset (see src/config/env.js).
 */

const COOLDOWN_MS = 30_000;

let cooldownUntil = 0;
let trailingTimer = null;

export function requestSiteRebuild(reason) {
  const url = env.deployHookUrl;
  if (!url) return;

  const now = Date.now();
  if (now < cooldownUntil) {
    if (!trailingTimer) {
      trailingTimer = setTimeout(
        () => {
          trailingTimer = null;
          void fire(url, `${reason} (queued after cooldown)`);
        },
        cooldownUntil - now + 500,
      );
      trailingTimer.unref?.();
    }
    return;
  }
  void fire(url, reason);
}

async function fire(url, reason) {
  cooldownUntil = Date.now() + COOLDOWN_MS;
  try {
    const response = await fetch(url, { method: "POST", signal: AbortSignal.timeout(15000) });
    console.log(`[deploy-hook] ${reason} -> Vercel rebuild ${response.status}`);
  } catch (error) {
    console.warn(`[deploy-hook] ${reason} failed: ${error.message}`);
  }
}
