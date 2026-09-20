import { useEffect } from "react";

import { updateSeo } from "@/lib/seo-head";

/**
 * SEO head block: title, description, canonical, robots, OpenGraph, Twitter.
 * JSON-LD is supplied by pages via the `jsonLd` prop (array of schema objects).
 */
export function Seo({
  title,
  description,
  path = "/",
  type = "website",
  image = "/og-image.png",
  noindex = false,
  publishedTime,
  author,
  section,
  jsonLd = [],
}) {
  const jsonKey = JSON.stringify(jsonLd);

  useEffect(() => {
    updateSeo({
      title,
      description,
      path,
      type,
      image,
      noindex,
      publishedTime,
      author,
      section,
      jsonLd,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, type, image, noindex, publishedTime, author, section, jsonKey]);

  return null;
}
