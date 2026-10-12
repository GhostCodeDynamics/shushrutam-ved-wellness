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

/**
 * Fetch-once hook with explicit status so pages can render loading/error states
 * instead of silently swapping content. `deps` must contain every value the
 * loader closes over (e.g. `slug`) so navigation refetches and re-renders <Seo>.
 */
function useOnce(loader, deps = []) {
  const [state, setState] = useState({ data: null, status: "loading" });
  useEffect(() => {
    let alive = true;
    setState({ data: null, status: "loading" });
    loader()
      .then((result) => {
        if (alive) setState({ data: result, status: "ready" });
      })
      .catch(() => {
        if (alive) setState({ data: null, status: "error" });
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

/**
 * The bundled demo posts in src/data/blog.js are a development aid only — in a
 * production build the journal is served exclusively from the API/CMS.
 */
const USE_STATIC_FALLBACK = import.meta.env.DEV;

export function useApiPosts() {
  const { data, status } = useOnce(async () => {
    const { items } = await api.get("/blog");
    const list = Array.isArray(items) ? items : [];
    const categories = [
      "All",
      ...new Set(list.map((p) => p.category || "General").filter(Boolean)),
    ];
    return { posts: list.map((p) => toCard(p)), categories };
  }, []);
  if (data) return { ...data, status: "ready" };
  if (status === "loading") return { posts: [], categories: [], status: "loading" };
  if (status === "error" && USE_STATIC_FALLBACK) {
    return { posts: staticPosts, categories: staticCategories, status: "fallback" };
  }
  return { posts: [], categories: [], status: "error" };
}

export function useApiPost(slug) {
  const { data, status } = useOnce(async () => {
    if (!slug) return { post: null, related: [] };
    let post;
    try {
      const response = await api.get(`/blog/${encodeURIComponent(slug)}`);
      post = response?.post;
    } catch (error) {
      // A real 404 (draft or missing slug) is a "not found" state, not a failure.
      if (error?.status === 404) return { post: null, related: [] };
      throw error;
    }
    if (!post || !post.slug) return { post: null, related: [] };
    const card = toCard(post);
    let related = [];
    try {
      const { items = [] } = await api.get("/blog");
      const sameCategory = items.filter(
        (p) => p.slug !== post.slug && (p.category || "General") === post.category,
      );
      const pool = sameCategory.length ? sameCategory : items.filter((p) => p.slug !== post.slug);
      related = pool.slice(0, 3).map((p) => toCard(p));
    } catch {
      related = [];
    }
    return { post: card, related };
  }, [slug]);

  if (data) return { ...data, status: "ready" };
  if (status === "loading") return { post: null, related: [], status: "loading" };
  if (status === "error" && USE_STATIC_FALLBACK) {
    const fallback = staticPosts.find((p) => p.slug === slug) || null;
    return {
      post: fallback,
      related: staticPosts.filter((p) => p.slug !== slug).slice(0, 3),
      status: "fallback",
    };
  }
  return { post: null, related: [], status: status === "error" ? "error" : "ready" };
}

export function useApiServices() {
  const { data } = useOnce(async () => {
    const { items } = await api.get("/services");
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.map((s) => ({
      title: s.title,
      description: s.description || "",
      icon: iconForService(s),
    }));
  });
  return data || staticServices;
}

export function useApiFaqs() {
  const { data } = useOnce(async () => {
    const { items } = await api.get("/faqs");
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.map((f) => ({ q: f.question, a: f.answer || "" }));
  });
  return data || staticFaqs;
}

export function useApiConditionGroups() {
  const { data } = useOnce(async () => {
    const result = await api.get("/conditions");
    const groups = result?.groups;
    const conditions = result?.items;
    if (!Array.isArray(groups) || groups.length === 0) return null;
    return groups.map((g) => ({
      group: g.name,
      items: (conditions || []).filter((c) => c.group === g.name).map((c) => c.title),
    }));
  });
  return data || staticConditionGroups;
}
