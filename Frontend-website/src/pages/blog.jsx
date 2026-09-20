import { useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { useApiPosts } from "@/lib/apiContent";
import { clinicSchema } from "@/lib/seo-schemas";
import { cn } from "@/lib/utils";

function PostCard({ post, index }) {
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="card-lift group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-soft">
        <Link
          to={`/blog/${post.slug}`}
          aria-label={`Read: ${post.title}`}
          className="relative block overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.imageAlt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.68rem] font-bold tracking-[0.14em] text-brand uppercase backdrop-blur">
            {post.category}
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden /> {post.readTime}
            </span>
          </p>
          <h2 className="mt-3 font-display text-[1.35rem] leading-snug">
            <Link to={`/blog/${post.slug}`} className="transition-colors group-hover:text-brand">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2.5 line-clamp-3 text-[0.92rem] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <Link
            to={`/blog/${post.slug}`}
            className="btn-arrow mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand"
          >
            Read article <ArrowRight className="size-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export default function Blog() {
  const [active, setActive] = useState("All");
  const { posts: blogPosts, categories: blogCategories } = useApiPosts();
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <>
      <Seo
        title="Wellness Journal | ShushrutamVed Care"
        description="Practical holistic wellness and lifestyle notes by Dr. Aarti Sen — PCOS, thyroid, gut health, sleep, weight and stress."
        path="/blog"
        jsonLd={[clinicSchema("/blog")]}
      />

      <PageHero
        eyebrow="Wellness journal"
        title="Notes on healing, from our clinic to you"
        description="Short, practical reads on hormones, gut, sleep, weight and calm — written by Dr. Aarti Sen in plain language, with steps you can actually follow."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Reveal
          className="flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300",
                active === c
                  ? "border-brand bg-brand text-cream shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-brand",
              )}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {featured && (
          <Reveal className="mt-12">
            <article className="group grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft lg:grid-cols-2">
              <Link
                to={`/blog/${featured.slug}`}
                className="relative block overflow-hidden"
                aria-label={`Read featured article: ${featured.title}`}
              >
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  decoding="async"
                  fetchPriority="high"
                  className="h-full min-h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:min-h-full"
                />
                <span className="absolute top-5 left-5 rounded-full bg-gold px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
                  Featured
                </span>
              </Link>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <Eyebrow>{featured.category}</Eyebrow>
                <h2 className="mt-4 font-display text-3xl leading-tight text-balance md:text-[2.4rem]">
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="transition-colors group-hover:text-brand"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
                  {featured.excerpt}
                </p>
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden /> {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden /> {featured.readTime}
                  </span>
                  <span>By Dr. Aarti Sen</span>
                </p>
                <div className="mt-7">
                  <Button asChild variant="hero" size="pill" className="btn-arrow">
                    <Link to={`/blog/${featured.slug}`}>
                      Read full article <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No articles in this topic yet — check back soon.
          </p>
        )}
      </section>
    </>
  );
}
