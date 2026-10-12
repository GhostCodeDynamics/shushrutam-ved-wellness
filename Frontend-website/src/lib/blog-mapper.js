import { blogPosts as staticPosts } from "@/data/blog";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Branded fallback when a post has no featured image (never a mismatched stock photo). */
const FALLBACK_IMAGE = "/og-image.png";

const ISO_DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

export function displayDate(value) {
  if (!value) return "";
  if (typeof value === "string" && !ISO_DATE_PATTERN.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function measureReadTime(blocks) {
  const minutes = Math.max(1, Math.ceil(wordCount(blocks) / 180));
  return `${minutes} min read`;
}

export function mapBlocks(content) {
  if (!Array.isArray(content)) return [];
  return content
    .map((block) => {
      if (block?.type === "heading") return { type: "h2", text: block.text || "" };
      if (block?.type === "list") {
        return { type: "list", items: Array.isArray(block.items) ? block.items : [] };
      }
      return { type: "p", text: block?.text || "" };
    })
    .filter((block) => block.text || (block.items && block.items.length));
}

export function toIsoDate(value) {
  if (!value) return "";
  const text = String(value).trim();
  if (!text) return "";
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(text);
  const parsed = new Date(dateOnly ? `${text}T00:00:00Z` : text);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

export function toCard(post, baseStaticPosts = staticPosts) {
  // Guard: `list.map(toCard)` passes the map index as the second argument, so a
  // non-array here must never be dereferenced (it used to crash the loader).
  const staticPool = Array.isArray(baseStaticPosts) ? baseStaticPosts : staticPosts;
  const staticMatch = staticPool.find((p) => p.slug === post.slug);
  const image = post.featuredImage || staticMatch?.image || post.image || FALLBACK_IMAGE;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    seoTitle: post.seoTitle || "",
    seoDescription: post.seoDescription || "",
    category: post.category || "General",
    date: displayDate(post.publishDate),
    publishedIso: toIsoDate(post.publishDate),
    modifiedIso: toIsoDate(post.updatedAt) || toIsoDate(post.publishDate),
    readTime: measureReadTime(post.content),
    image,
    imageAlt: post.imageAlt || post.title || "",
    takeaways: staticMatch?.takeaways || [],
    content: mapBlocks(post.content),
  };
}

function wordCount(blocks) {
  if (!Array.isArray(blocks)) return 0;
  return blocks.reduce((total, block) => {
    const textWords = String(block?.text || "")
      .split(/\s+/)
      .filter(Boolean).length;
    const listWords = Array.isArray(block?.items)
      ? block.items.join(" ").split(/\s+/).filter(Boolean).length
      : 0;
    return total + textWords + listWords;
  }, 0);
}
