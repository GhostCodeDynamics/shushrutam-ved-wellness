import { blogPosts as staticPosts } from "@/data/blog";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

export function toCard(post, baseStaticPosts = staticPosts) {
  const featuredImage = post.featuredImage || "";
  const staticMatch = baseStaticPosts.find((p) => p.slug === post.slug);
  const image = featuredImage || staticMatch?.image || baseStaticPosts[0]?.image || "";
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.category || "General",
    date: displayDate(post.publishDate),
    readTime: measureReadTime(post.content),
    image,
    imageAlt: post.title || "",
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
