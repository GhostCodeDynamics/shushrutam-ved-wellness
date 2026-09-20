export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueSlugSuffix(slug, existing) {
  // existing: set of taken slugs. Appends -2, -3... until free.
  let candidate = slug;
  let n = 2;
  while (existing.has(candidate)) {
    candidate = `${slug}-${n}`;
    n += 1;
  }
  return candidate;
}