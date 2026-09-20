import { useEffect, useState } from "react";
import {
  Activity,
  Apple,
  Brain,
  CalendarHeart,
  Droplets,
  Dumbbell,
  Flower2,
  HeartPulse,
  Leaf,
  Menu,
  Moon,
  Salad,
  Scale,
  Sparkles,
  Stethoscope,
  Sun,
  UtensilsCrossed,
  Wind,
} from "lucide-react";

import { api } from "@/lib/api";
import { blogCategories as staticCategories, blogPosts as staticPosts } from "@/data/blog";
import {
  conditionGroups as staticConditionGroups,
  faqs as staticFaqs,
  services as staticServices,
} from "@/data/clinic";
import { toCard } from "@/lib/blog-mapper";

const ICON_MAP = {
  Activity,
  Apple,
  Brain,
  CalendarHeart,
  Droplets,
  Dumbbell,
  Flower2,
  HeartPulse,
  Leaf,
  Menu,
  Moon,
  Salad,
  Scale,
  Sparkles,
  Stethoscope,
  Sun,
  UtensilsCrossed,
  Wind,
};

function iconForService(service) {
  const byTitle = staticServices.find((s) => s.title === service.title)?.icon;
  return byTitle || ICON_MAP[service.icon] || Leaf;
}

function useOnce(loader) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    let alive = true;
    loader()
      .then((result) => {
        if (alive) setValue(result);
      })
      .catch(() => {
        if (alive) setValue(null);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function useApiPosts() {
  const fetched = useOnce(async () => {
    const { items } = await api.get("/blog");
    if (!Array.isArray(items) || items.length === 0) return null;
    const categories = [
      "All",
      ...new Set([
        ...staticCategories,
        ...items.map((p) => p.category || "General").filter(Boolean),
      ]),
    ];
    return { posts: items.map(toCard), categories };
  });
  return fetched || { posts: staticPosts, categories: staticCategories };
}

export function useApiPost(slug) {
  const fetched = useOnce(async () => {
    if (!slug) return null;
    const { post } = await api.get(`/blog/${encodeURIComponent(slug)}`);
    if (!post || !post.slug) return null;
    const card = toCard(post);
    let related = [];
    try {
      const { items = [] } = await api.get("/blog");
      const sameCategory = items.filter(
        (p) => p.slug !== post.slug && (p.category || "General") === post.category,
      );
      const pool = sameCategory.length ? sameCategory : items.filter((p) => p.slug !== post.slug);
      related = pool.slice(0, 3).map(toCard);
    } catch {
      related = [];
    }
    return {
      post: card,
      related: related.length
        ? related
        : staticPosts.filter((p) => p.slug !== post.slug).slice(0, 3),
    };
  });
  return (
    fetched || {
      post: staticPosts.find((p) => p.slug === slug) || null,
      related: staticPosts.filter((p) => p.slug !== slug).slice(0, 3),
    }
  );
}

export function useApiServices() {
  const fetched = useOnce(async () => {
    const { items } = await api.get("/services");
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.map((s) => ({
      title: s.title,
      description: s.description || "",
      icon: iconForService(s),
    }));
  });
  return fetched || staticServices;
}

export function useApiFaqs() {
  const fetched = useOnce(async () => {
    const { items } = await api.get("/faqs");
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.map((f) => ({ q: f.question, a: f.answer || "" }));
  });
  return fetched || staticFaqs;
}

export function useApiConditionGroups() {
  const fetched = useOnce(async () => {
    const result = await api.get("/conditions");
    const groups = result?.groups;
    const conditions = result?.items;
    if (!Array.isArray(groups) || groups.length === 0) return null;
    return groups.map((g) => ({
      group: g.name,
      items: (conditions || []).filter((c) => c.group === g.name).map((c) => c.title),
    }));
  });
  return fetched || staticConditionGroups;
}
