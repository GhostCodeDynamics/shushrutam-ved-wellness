import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/components/site/Seo";
import { processSteps } from "@/data/clinic";
import { useApiServices } from "@/lib/apiContent";
import { clinicSchema, serviceListSchema } from "@/lib/seo-schemas";

export default function Services() {
  const services = useApiServices();
  const [featured, ...rest] = services;
  return (
    <>
      <Seo
        title="Holistic &amp; Integrative Wellness Services | ShushrutamVed Care"
        description="Ayurveda, naturopathy, nutrition counselling, yoga therapy, Panchakarma, Reiki, detox, weight, thyroid, diabetes, digestive, women's wellness and oncology nutrition support programmes."
        path="/services"
        jsonLd={[clinicSchema("/services"), serviceListSchema(services)]}
      />

      <PageHero
        eyebrow="Services"
        title="Wellness programmes, personally written"
        description="Each programme is shaped around your reports, your routine and your kitchen — combining nutrition, movement, breathwork and natural therapies with modern medicine where relevant."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Reveal>
          <article className="relative grid overflow-hidden rounded-[2rem] border border-border bg-brand-deep text-cream shadow-lift md:grid-cols-[1.2fr_1fr]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-20 size-72 rounded-full bg-brand-soft/30 blur-3xl"
            />
            <div className="relative p-8 md:p-12 lg:p-14">
              <span className="rounded-full bg-gold px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase">
                Where most journeys begin
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight md:text-[2.6rem]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-cream/80">
                {featured.description} A 45-minute root-cause consultation that maps your history,
                habits and healing potential — with clear first steps you take away the same day.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["History & reports review", "Root-cause mapping", "Clear first steps"].map(
                  (x) => (
                    <li
                      key={x}
                      className="rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-xs font-bold tracking-wide"
                    >
                      {x}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="pill" className="btn-arrow">
                  <Link to="/appointment">
                    Book this consultation <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden items-end p-8 md:flex md:p-12">
              <span
                aria-hidden
                className="grid size-56 place-items-center rounded-full border border-cream/15"
              >
                <span className="grid size-40 place-items-center rounded-full bg-cream/[0.07] backdrop-blur">
                  <featured.icon className="size-16 text-gold" />
                </span>
              </span>
            </div>
          </article>
        </Reveal>

        <h2 className="mt-20 text-center font-display text-3xl text-balance md:text-[2.6rem]">
          All {services.length} programmes
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-muted-foreground">
          Every plan blends nutrition, movement, breathwork and natural therapies into a routine
          that fits your life — no templates, no products you don't need.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70} className="h-full">
              <article className="card-lift group flex h-full flex-col rounded-[1.6rem] border border-border bg-card p-7 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-brand/15 bg-brand-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-cream">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-sm text-muted-foreground/60">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <Link
                  to="/appointment"
                  aria-label={`Book ${s.title}`}
                  className="btn-arrow mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand"
                >
                  Book this <ArrowUpRight className="size-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="How care unfolds"
            title="A guided, four-step journey"
            description="No rush, no confusion — a clear path from first conversation to confident, independent health."
          />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div
              aria-hidden
              className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent lg:block"
            />
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} as="li" className="relative">
                <div className="group h-full rounded-[1.8rem] border border-border bg-card p-7 pt-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-lift">
                  <span className="relative grid size-14 place-items-center rounded-full bg-brand font-display text-lg text-cream ring-8 ring-background transition-colors group-hover:bg-brand-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-[0.7rem] font-bold tracking-[0.22em] text-gold uppercase">
                    Step 0{i + 1}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.4rem] leading-snug">{step.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14 text-center">
            <Button asChild variant="hero" size="pill" className="btn-arrow">
              <Link to="/appointment">
                Start with a consultation <CalendarDays className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
