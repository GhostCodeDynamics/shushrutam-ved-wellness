import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Eyebrow } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { clinic } from "@/data/clinic";
import { useApiPost } from "@/lib/apiContent";
import { articleSchema, breadcrumbSchema } from "@/lib/seo-schemas";

function parseDisplayDate(value) {
  const parsed = new Date(`${value} UTC`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function Block({ block }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 font-display text-2xl leading-snug md:text-[1.7rem]">{block.text}</h2>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mt-5 space-y-3 rounded-2xl border border-brand/15 bg-brand-tint/60 p-6">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-5 leading-[1.85] text-ink/80">{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { post, related } = useApiPost(slug);

  if (!post) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow-center justify-center">Not found</p>
        <h1 className="mt-5 font-display text-4xl">This article doesn't exist</h1>
        <p className="mt-4 text-muted-foreground">
          It may have been moved. Browse the journal for more reads.
        </p>
        <Button asChild variant="hero" size="pill" className="mt-8">
          <Link to="/blog">
            <ArrowLeft className="size-4" /> Back to journal
          </Link>
        </Button>
      </section>
    );
  }

  const publishedIso = parseDisplayDate(post.date);

  return (
    <>
      <Seo
        title={`${post.title} | ShushrutamVed Care`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={publishedIso}
        author={clinic.doctor}
        section={post.category}
        jsonLd={[
          articleSchema({ ...post, publishedTime: publishedIso }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="texture-grain relative overflow-hidden bg-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-4rem] size-[22rem] rounded-full bg-brand-tint blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-14 pb-10 md:pt-20">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline underline-offset-4"
            >
              <ArrowLeft className="size-4" /> All articles
            </Link>
            <div className="mt-6">
              <Eyebrow>{post.category}</Eyebrow>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-balance md:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-brand/15 pt-6 text-sm font-semibold text-muted-foreground">
              <span className="text-ink">By {clinic.doctor}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden /> {post.readTime}
              </span>
            </p>
          </Reveal>
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-lift">
              <img
                src={post.image}
                alt={post.imageAlt}
                decoding="async"
                fetchPriority="high"
                className="aspect-[16/8] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="text-[1.02rem]">
            {post.content.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </Reveal>

        {post.takeaways?.length > 0 && (
          <Reveal>
            <aside className="mt-12 rounded-[1.8rem] bg-brand-deep p-8 text-cream md:p-10">
              <p className="text-[0.72rem] font-bold tracking-[0.22em] text-gold uppercase">
                Key takeaways
              </p>
              <ul className="mt-5 space-y-3.5">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 leading-relaxed text-cream/90">
                    <Check className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-10 rounded-[1.8rem] border border-border bg-card p-8 text-center shadow-soft">
            <p className="font-display text-2xl">Need personal guidance?</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Articles teach principles; your body needs a personal plan. Book a consultation and
              we'll map this to you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="pill">
                <Link to="/appointment">Book Appointment</Link>
              </Button>
              <Button asChild variant="outlineBrand" size="pill">
                <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            Disclaimer: This article shares general wellness education, not medical advice. It is
            not a substitute for diagnosis or emergency care — please consult your physician for
            personal decisions.
          </p>
        </Reveal>
      </div>

      <section className="border-t border-border bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl">Keep reading</h2>
            <Link
              to="/blog"
              className="btn-arrow inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline underline-offset-4"
            >
              View all articles <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} className="h-full">
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-soft">
                  <Link to={`/blog/${p.slug}`} className="relative block overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.68rem] font-bold tracking-[0.14em] text-brand uppercase">
                      {p.category}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl leading-snug">
                      <Link
                        to={`/blog/${p.slug}`}
                        className="transition-colors group-hover:text-brand"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-muted-foreground">
                      {p.date} · {p.readTime}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
