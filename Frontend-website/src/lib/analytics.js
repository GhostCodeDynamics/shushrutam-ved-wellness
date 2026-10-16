// Production builds only: `npm run dev` on localhost must never send hits to
// the live GA4 property (import.meta.env.PROD is true only for `vite build`).
const MEASUREMENT_ID = import.meta.env.PROD
  ? (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim()
  : "";

export const analyticsEnabled = Boolean(MEASUREMENT_ID);

function gtag(...args) {
  if (!analyticsEnabled || typeof window === "undefined") return;
  window.gtag?.(...args);
}

export function initAnalytics() {
  if (!analyticsEnabled || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtagFn() {
    window.dataLayer.push(arguments);
  };
  gtag("js", new Date());
  // send_page_view:false — App.jsx's <AnalyticsTracker/> fires the page_view
  // event on every SPA route change (including the first render), so the
  // config-level automatic page_view would double-count the landing page.
  gtag("config", MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });
}

export function trackPageView({ location, title }) {
  if (!analyticsEnabled) return;
  gtag("event", "page_view", {
    page_path: location,
    page_location: `${window.location.origin}${location}`,
    page_title: title || document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!analyticsEnabled) return;
  gtag("event", name, params);
}
