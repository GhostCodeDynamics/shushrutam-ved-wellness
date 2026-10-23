import { clinic } from "@/data/clinic";
import { absoluteUrl } from "@/lib/site";

const DEFAULT_OG_IMAGE = "/og-image.png";
const DEFAULT_OG_ALT = `${clinic.name} — naturopathy and holistic wellness clinic in Bhopal`;

function upsertMeta(attr, key, value) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  if (el.getAttribute("content") !== value) {
    el.setAttribute("content", value);
  }
}

function removeByAttr(attr, key) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  document.head.querySelector(selector)?.remove();
}

export function updateSeo({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  publishedTime,
  author,
  section,
  jsonLd = [],
}) {
  if (typeof document === "undefined") return;

  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const ogAlt = imageAlt || DEFAULT_OG_ALT;
  const isDefaultImage = ogImage.endsWith(DEFAULT_OG_IMAGE);

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

  upsertMeta("property", "og:site_name", clinic.name);
  upsertMeta("property", "og:locale", "en_IN");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:image", ogImage);
  upsertMeta("property", "og:image:alt", ogAlt);
  upsertMeta("property", "og:description", description);

  if (isDefaultImage) {
    upsertMeta("property", "og:image:type", "image/png");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
  } else {
    removeByAttr("property", "og:image:type");
    removeByAttr("property", "og:image:width");
    removeByAttr("property", "og:image:height");
  }

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", ogImage);
  upsertMeta("name", "twitter:image:alt", ogAlt);

  if (publishedTime) {
    upsertMeta("property", "article:published_time", publishedTime);
  } else {
    removeByAttr("property", "article:published_time");
  }
  if (author) {
    upsertMeta("property", "article:author", author);
  } else {
    removeByAttr("property", "article:author");
  }
  if (section) {
    upsertMeta("property", "article:section", section);
  } else {
    removeByAttr("property", "article:section");
  }

  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  if (canonicalLink.getAttribute("href") !== canonical) {
    canonicalLink.setAttribute("href", canonical);
  }

  const scriptSelector = 'script[type="application/ld+json"][data-seo="true"]';
  const existing = document.head.querySelector(scriptSelector);
  if (jsonLd.length > 0) {
    let script = existing;
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo", "true");
      document.head.appendChild(script);
    }
    // Escape "<" so user/CMS content can never close the script tag
    // (`</script>` breakout) when the DOM is serialized for crawlers.
    const next = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    if (script.textContent !== next) {
      script.textContent = next;
    }
  } else if (existing) {
    existing.remove();
  }
}
