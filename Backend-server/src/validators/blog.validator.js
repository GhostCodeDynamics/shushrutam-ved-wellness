import { AppError, validationError } from "../utils/AppError.js";
import { cleanArrayOfStrings, cleanBoolean, cleanString } from "../utils/sanitize.js";

export function assertBlogPostPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") {
    throw new AppError("Request body is required", 400);
  }

  const result = {};

  if (partial) {
    const hasAny =
      Object.keys(body).filter((k) => k !== "content").length > 0 || Array.isArray(body.content);
    if (!hasAny) {
      throw validationError("Nothing to update", []);
    }
  }

  if (body.title !== undefined) {
    const title = cleanString(body.title, { max: 200 });
    if (!title) {
      throw validationError("Title is required", [{ field: "title", message: "Required" }]);
    }
    result.title = title;
  }

  if (body.slug !== undefined) {
    const slug = cleanString(body.slug, { max: 200 }).toLowerCase();
    if (!slug) {
      throw validationError("Slug is required", [{ field: "slug", message: "Required" }]);
    }
    result.slug = slug.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  }

  if (body.excerpt !== undefined) result.excerpt = cleanString(body.excerpt, { max: 500 });
  if (body.category !== undefined) result.category = cleanString(body.category, { max: 80 }) || "General";
  if (body.author !== undefined) result.author = cleanString(body.author, { max: 120 });
  if (body.publishDate !== undefined) result.publishDate = cleanString(body.publishDate, { max: 30 });
  if (body.featuredImage !== undefined) result.featuredImage = cleanString(body.featuredImage, { max: 500 });
  if (body.seoTitle !== undefined) result.seoTitle = cleanString(body.seoTitle, { max: 200 });
  if (body.seoDescription !== undefined) result.seoDescription = cleanString(body.seoDescription, { max: 400 });

  if (body.isPublished !== undefined) {
    const isPublished = cleanBoolean(body.isPublished);
    if (isPublished === undefined) {
      throw validationError("isPublished must be a boolean", [{ field: "isPublished", message: "Invalid" }]);
    }
    result.isPublished = isPublished;
  }

  if (body.content !== undefined) {
    if (!Array.isArray(body.content)) {
      throw validationError("Content must be an array of blocks", [
        { field: "content", message: "Must be an array" },
      ]);
    }
    result.content = body.content
      .slice(0, 200)
      .map((block) => cleanContentBlock(block))
      .filter(Boolean);
  }

  if (!partial && !result.title) {
    throw validationError("Title is required", [{ field: "title", message: "Required" }]);
  }

  return result;
}

function cleanContentBlock(block) {
  if (!block || typeof block !== "object") return null;
  const type = block.type;
  if (!["heading", "paragraph", "list"].includes(type)) return null;
  if (type === "list") {
    const items = cleanArrayOfStrings(block.items, { maxItems: 50, maxLength: 1000 });
    if (items.length === 0) return null;
    return { type, items };
  }
  const text = cleanString(block.text, { max: 4000 });
  if (!text) return null;
  return { type, text };
}