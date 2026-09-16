import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import aboutNature from "@/assets/about-nature.jpg";
import doctorHero from "@/assets/doctor-hero.png";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { Eyebrow, SectionHeading } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  clinic,
  conditionGroups,
  faqs,
  processSteps,
  services,
  specializations,
  trustPoints,
} from "@/data/clinic";
import { cn } from "@/lib/utils";

const heroStats = [
  { k: "6+", v: "Years of practice" },
  { k: "12", v: "Wellness programmes" },
  { k: "16", v: "Holistic therapies" },
];

const concernIcons = [
  "Hormonal & Metabolic",
  "Digestive Health",
  "Pain & Mobility",
  "Mind & Sleep",
];

function Hero() {
  return (
    <section className="texture-grain relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10rem] right-[-8rem] size-[30rem] rounded-full bg-brand-tint blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12rem] left-[-8rem] size-[26rem] rounded-full bg-sand blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 300 300"
        className="pointer-events-none absolute top-16 left-[4%] hidden w-24 text-brand/15 lg:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M150 20 C 150 90, 150 180, 150 280" />
          <path d="M150 70 C 110 60, 80 40, 70 15 C 110 20, 140 40, 150 70" />
          <path d="M150 120 C 190 110, 220 90, 230 65 C 190 70, 160 90, 150 120" />
          <path d="M150 175 C 115 165, 90 148, 82 122 C 118 128, 142 148, 150 175" />
          <path d="M150 225 C 185 215, 210 198, 218 172 C 182 178, 158 198, 150 225" />
        </g>
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-16 lg:pb-24">
        <Reveal>
          <Eyebrow>Natural health × Modern science</Eyebrow>
          <h1 className="mt-5 max-w-xl font-display text-[2.75rem] leading-[1.04] text-balance text-ink sm:text-6xl lg:text-[4.4rem]">
            Natural healing for{" "}
            <span className="relative inline-block text-brand italic">
              a healthier
              <svg
                aria-hidden
                viewBox="0 0 220 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-gold"
              >
                <path
                  d="M4 10 C 60 3, 150 3, 216 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>{" "}
            life.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            Naturopathy, clinical nutrition and lifestyle medicine — thoughtfully combined by{" "}
            {clinic.doctor} to treat the root cause, not just the symptom. Calm, personalised care
            for modern living.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="pill" className="btn-arrow">
              <Link to="/appointment">
                Book Appointment <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineBrand" size="pill" className="btn-arrow">
              <Link to="/services">
                Explore Treatments <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              Trusted by patients across Bhopal & online
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
              <BadgeCheck className="size-4" /> Root-cause care
            </span>
          </div>

          <dl className="mt-9 grid max-w-lg grid-cols-3 border-t border-brand/15 pt-7">
            {heroStats.map((s, i) => (
              <div key={s.v} className={cn("pr-5", i > 0 && "border-l border-brand/15 pl-5")}>
                <dt className="font-display text-4xl text-brand md:text-[2.6rem]">{s.k}</dt>
                <dd className="mt-1 text-xs leading-snug font-semibold tracking-wide text-muted-foreground uppercase">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="relative">
          <div className="relative mx-auto max-w-sm lg:max-w-[26rem]">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full rounded-b-[2rem] bg-sand"
            />
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 translate-y-2 rounded-t-full rounded-b-[2rem] border border-brand/20"
            />
            <div className="arch-mask relative overflow-hidden border border-brand/15 bg-card shadow-lift">
              <img
                src={doctorHero}
                alt={`${clinic.doctor}, naturopathy and lifestyle medicine consultant`}
                width={1024}
                height={1280}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/25 via-transparent to-transparent"
              />
            </div>

            <div className="absolute -bottom-7 left-1/2 w-[92%] max-w-xs -translate-x-1/2 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lift backdrop-blur sm:left-2 sm:translate-x-0">
              <p className="font-display text-lg leading-tight">{clinic.doctor}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {clinic.qualification} · Naturopathy & Lifestyle Medicine
              </p>
              <p className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs font-semibold text-brand">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                Accepting new patients · In-clinic & online
              </p>
            </div>

            <div className="animate-float-slow absolute -top-2 -right-2 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-soft backdrop-blur sm:-right-8">
              <p className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <Leaf className="size-3.5 text-brand" /> 100% Natural
              </p>
              <p className="mt-0.5 text-[0.7rem] text-muted-foreground">Food · Breath · Sleep</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section aria-label="Why patients trust us" className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((t, i) => (
          <Reveal key={t.title} delay={i * 70}>
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brand/15 bg-brand-tint text-brand">
                <t.icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[1.05rem] leading-snug">{t.title}</span>
                <span className="mt-1 block text-[0.85rem] leading-relaxed text-muted-foreground">
                  {t.description}
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="relative overflow-hidden bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute top-10 right-0 hidden font-display text-[11rem] leading-none text-brand/[0.05] select-none xl:block"
      >
        01
      </span>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[3rem] bg-brand-tint/70 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] rounded-tr-[6rem] border border-border shadow-lift">
              <img
                src={aboutNature}
                alt="Fresh herbs, seeds and infused water arranged on natural linen"
                width={1200}
                height={912}
                loading="lazy"
                className="aspect-[4/3.4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <figure className="absolute -bottom-8 left-5 max-w-[15rem] rounded-2xl border border-brand/15 bg-brand-deep p-5 text-cream shadow-lift md:left-8">
              <blockquote className="font-display text-[1.05rem] leading-snug italic">
                “Given the right conditions, the body restores balance.”
              </blockquote>
              <figcaption className="mt-2 text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
                Our philosophy
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] text-balance md:text-[3.25rem]">
              Science-trained.
              <br />
              <span className="text-brand italic">Nature-guided.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-pretty text-muted-foreground">
              {clinic.doctor} brings a rare combination to wellness care — a research background in{" "}
              {clinic.qualification} alongside {clinic.experience} of naturopathic and lifestyle
              practice. Her work in molecular research, plant tissue culture and oncology nutrition
              shapes a method that is gentle in approach and rigorous in reasoning.
            </p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              Her mission is simple: help people reclaim health through daily choices — real food,
              restorative sleep, mindful movement and calm breathing — with plans they can sustain.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Specialisations">
              {specializations.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-brand/15 bg-brand-tint px-4 py-2 text-xs font-bold tracking-wide text-brand"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="pill" className="btn-arrow">
                <Link to="/about">
                  Read full profile <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="pill">
                <a href={clinic.phoneHref}>
                  <Phone className="size-4" /> Talk to the clinic
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const [featured, ...rest] = services;
  return (
    <section className="texture-grain relative overflow-hidden bg-brand-deep text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 size-[28rem] rounded-full bg-brand-soft/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading
          light
          eyebrow="Our services"
          title="Programmes designed around your life"
          description="Every plan begins with listening — then blends nutrition, movement, breathwork and natural therapies into a routine that fits you."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-cream/15 bg-cream p-8 text-ink shadow-lift">
              <div
                aria-hidden
                className="absolute -top-16 -right-16 size-56 rounded-full bg-brand-tint blur-2xl transition-transform duration-500 group-hover:scale-125"
              />
              <span className="absolute top-7 left-8 rounded-full bg-brand px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-cream uppercase">
                Most loved · 01
              </span>
              <span className="relative grid size-14 place-items-center rounded-2xl bg-brand text-cream">
                <featured.icon className="size-6" aria-hidden />
              </span>
              <h3 className="relative mt-6 font-display text-3xl leading-tight">
                {featured.title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-muted-foreground">
                {featured.description} A 45-minute root-cause consultation that maps your history,
                habits and healing potential — with clear first steps.
              </p>
              <Link
                to="/appointment"
                className="btn-arrow relative mt-6 inline-flex items-center gap-2 font-bold text-brand"
              >
                Start here <ArrowRight className="size-4" />
              </Link>
            </article>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.slice(0, 6).map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 70 + i * 20}>
                <article className="card-lift group h-full rounded-[1.6rem] border border-cream/15 bg-cream/[0.06] p-6 backdrop-blur-sm hover:bg-cream hover:text-ink">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-gold/20 text-gold transition-colors duration-300 group-hover:bg-brand group-hover:text-cream">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-display text-sm text-cream/40 transition-colors group-hover:text-muted-foreground">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.15rem] leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65 transition-colors group-hover:text-muted-foreground">
                    {s.description}
                  </p>
                  <Link
                    to="/services"
                    aria-label={`Explore ${s.title}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold transition-colors group-hover:text-brand"
                  >
                    Explore{" "}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-8 text-center">
          <Button
            asChild
            size="pill"
            variant="outline"
            className="border-cream/30 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
          >
            <Link to="/services" className="btn-arrow">
              View all 12 programmes <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Concerns() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Conditions we treat</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-balance md:text-[3rem]">
              Concerns we see <span className="text-brand italic">every week.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
              From metabolic and hormonal imbalance to pain, digestion and sleep — treated
              naturally, and tracked carefully. Select a concern to see what we commonly help with.
            </p>
            <div className="mt-8 rounded-3xl border border-brand/15 bg-card p-6 shadow-soft">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <BadgeCheck className="size-4 text-brand" /> Not sure where you fit?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Book a consultation — we will map your symptoms to the right programme in the first
                visit itself.
              </p>
              <Button asChild variant="hero" size="pillSm" className="btn-arrow mt-5">
                <Link to="/appointment">
                  Get guidance <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Wellness concerns"
            className="overflow-hidden rounded-[1.8rem] border border-border bg-card shadow-soft"
          >
            {conditionGroups.map((g, i) => {
              const open = active === i;
              return (
                <div key={g.group} className={cn(i > 0 && "border-t border-border")}>
                  <button
                    role="tab"
                    aria-selected={open}
                    aria-expanded={open}
                    aria-controls={`concern-panel-${i}`}
                    id={`concern-tab-${i}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors md:px-8",
                      open ? "bg-brand text-cream" : "bg-card hover:bg-brand-tint/60",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          "font-display text-sm",
                          open ? "text-gold" : "text-muted-foreground",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span>
                        <span className="block text-[0.68rem] font-bold tracking-[0.2em] uppercase opacity-70">
                          {concernIcons[i]}
                        </span>
                        <span className="mt-0.5 block font-display text-xl md:text-[1.35rem]">
                          {g.group}
                        </span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-transform duration-300",
                        open
                          ? "rotate-45 border-cream/30 bg-cream/15"
                          : "border-border bg-background",
                      )}
                    >
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </button>
                  <div
                    id={`concern-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`concern-tab-${i}`}
                    className={cn(
                      "grid transition-all duration-400 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-2 px-6 py-5 md:px-8">
                        {g.items.map((c) => (
                          <li
                            key={c}
                            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-tint px-4 py-2 text-sm font-semibold text-brand"
                          >
                            <Check className="size-3.5" aria-hidden />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow="Treatment process"
          title="Four calm steps to lasting change"
          description="No rush, no confusion — a clear journey from first conversation to confident, independent health."
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask before booking"
          description="Honest answers — so you arrive feeling clear, not curious."
        />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-2 shadow-soft transition-colors data-[state=open]:border-brand/30 data-[state=open]:bg-white md:px-3"
              >
                <AccordionTrigger className="group gap-4 px-4 py-5 text-left font-display text-[1.05rem] leading-snug font-normal hover:no-underline md:text-lg [&>svg]:hidden">
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 font-sans text-xs font-bold text-brand/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand group-data-[state=open]:bg-brand group-data-[state=open]:text-cream">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 md:px-12">
                  <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal className="mt-8 text-center">
          <Link
            to="/faq"
            className="btn-arrow inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline underline-offset-4"
          >
            Read all FAQs <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-4">
      <Reveal>
        <div className="texture-grain relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-16 text-center text-cream md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-28 -left-20 size-80 rounded-full bg-brand-soft/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-gold/25 blur-3xl"
          />
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="pointer-events-none absolute top-8 left-8 hidden w-28 text-cream/15 md:block"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M100 15 C 100 70, 100 130, 100 185" />
              <path d="M100 55 C 75 48, 58 35, 52 18 C 78 22, 94 36, 100 55" />
              <path d="M100 100 C 125 93, 142 80, 148 63 C 122 67, 106 81, 100 100" />
              <path d="M100 145 C 78 138, 62 126, 57 108 C 80 112, 94 126, 100 145" />
            </g>
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="pointer-events-none absolute right-8 bottom-8 hidden w-28 rotate-180 text-cream/15 md:block"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M100 15 C 100 70, 100 130, 100 185" />
              <path d="M100 55 C 75 48, 58 35, 52 18 C 78 22, 94 36, 100 55" />
              <path d="M100 100 C 125 93, 142 80, 148 63 C 122 67, 106 81, 100 100" />
            </g>
          </svg>
          <p className="eyebrow-center relative justify-center text-gold">
            Begin when you're ready
          </p>
          <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-4xl leading-[1.08] text-balance md:text-[3.25rem]">
            Ready to begin <span className="italic">your healing journey?</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-cream/80">
            Book a consultation and receive a personalised naturopathy and lifestyle plan built
            entirely around you — your kitchen, your routine, your body.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="pill" className="btn-arrow">
              <Link to="/appointment">
                Book Appointment <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="pill"
              variant="outline"
              className="border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> WhatsApp Enquiry
              </a>
            </Button>
          </div>
          <p className="relative mt-6 text-xs tracking-wide text-cream/60">
            In-clinic in Bhopal · Online across India · Replies within one working day
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Booking() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <Reveal>
          <div className="h-full rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-10">
            <Eyebrow>Book a visit</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-[2.6rem]">
              Request an appointment
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Share a few details and our care team will confirm a slot that suits you — in clinic
              or online.
            </p>
            <div className="mt-8">
              <AppointmentForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-5">
          <div className="rounded-[1.8rem] border border-brand/15 bg-brand-tint/70 p-7">
            <h3 className="font-display text-xl">Clinic details</h3>
            <ul className="mt-5 space-y-4 text-sm text-ink/80">
              <li className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-cream">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <span className="leading-relaxed">{clinic.address}</span>
              </li>
              <li className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-cream">
                  <Phone className="size-4" aria-hidden />
                </span>
                <a href={clinic.phoneHref} className="self-center font-semibold hover:text-brand">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-cream">
                  <Mail className="size-4" aria-hidden />
                </span>
                <a
                  href={`mailto:${clinic.email}`}
                  className="self-center break-all font-semibold hover:text-brand"
                >
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-soft">
            <h3 className="flex items-center gap-2 font-display text-xl">
              <Clock className="size-5 text-brand" aria-hidden /> Opening hours
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {clinic.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="text-right font-bold">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[1.8rem] border border-border shadow-soft">
            <iframe
              title="Clinic location map"
              src={clinic.map}
              loading="lazy"
              className="h-64 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/85 py-2 pr-5 pl-2 text-xs font-semibold text-cream backdrop-blur">
              <span className="grid size-7 place-items-center rounded-full bg-gold text-ink">
                <MapPin className="size-3.5" aria-hidden />
              </span>
              Kolar Road, Bhopal
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ShushrutamVed Care | Natural Healing for a Healthier Life</title>
        <meta
          name="description"
          content="Premium naturopathy, nutrition and lifestyle medicine with Dr. Aarti Sen. Personalised natural care for weight, thyroid, PCOS, digestion, pain and stress."
        />
        <meta
          property="og:title"
          content="ShushrutamVed Care | Natural Healing for a Healthier Life"
        />
        <meta
          property="og:description"
          content="Naturopathy, nutrition and lifestyle medicine led by Dr. Aarti Sen."
        />
      </Helmet>

      <Hero />
      <TrustBar />
      <Approach />
      <Programs />
      <Concerns />
      <Steps />
      <Faq />
      <Cta />
      <Booking />
    </>
  );
}
