import { ArrowRight, BadgeCheck, Leaf, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import doctorImage from "@/assets/about-doctor-image.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow, SectionHeading } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/components/site/Seo";
import { clinic, specializations, trustPoints } from "@/data/clinic";
import { clinicSchema } from "@/lib/seo-schemas";
import { cn } from "@/lib/utils";

const journey = [
  {
    period: "The scientist's beginning",
    text: "Molecular research and plant tissue culture — studying how living systems repair themselves.",
    icon: Leaf,
  },
  {
    period: "The clinical practice",
    text: `${clinic.experience} of naturopathic and lifestyle practice across weight, hormones, digestion and pain.`,
    icon: BadgeCheck,
  },
  {
    period: "The philosophy",
    text: "Given the right conditions — food, sleep, movement, breath — the body restores its own balance.",
    icon: Leaf,
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Dr. Aarti Sen | ShushrutamVed Care"
        description="Meet Dr. Aarti Sen, M.Sc. Biotechnology with 6+ years in naturopathy, lifestyle medicine, oncology nutrition and wellness at ShushrutamVed Care."
        path="/about"
        jsonLd={[clinicSchema("/about")]}
      />

      <PageHero
        eyebrow="About"
        title="Science-trained. Nature-guided."
        description={`${clinic.doctor} blends research rigour with the quiet wisdom of natural healing — for people who want lasting change, not quick fixes.`}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[3rem] bg-brand-tint/70 blur-2xl"
            />
            <div className="arch-mask relative overflow-hidden border border-brand/15 shadow-lift">
              <img
                src={doctorImage}
                alt={`${clinic.doctor} at ShushrutamVed Care`}
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-7 left-1/2 w-[88%] max-w-xs -translate-x-1/2 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lift backdrop-blur sm:left-6 sm:translate-x-0">
              <p className="font-display text-lg leading-tight">{clinic.doctor}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {clinic.qualification} · Naturopathy & Lifestyle Medicine
              </p>
              <p className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs font-semibold text-brand">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                {clinic.experience} of clinical practice
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Meet your practitioner</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[1.08] text-balance md:text-[3rem]">
                {clinic.doctor}
              </h2>
              <p className="mt-3 text-sm font-bold tracking-[0.16em] text-brand uppercase">
                {clinic.qualification} · {clinic.experience}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-7 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Dr. Aarti Sen began in laboratories — molecular research and plant tissue culture
                  — studying how living systems repair themselves. That curiosity led her to
                  naturopathy, where the same principle applies at human scale: given the right
                  conditions, the body restores balance.
                </p>
                <p>
                  Over {clinic.experience.toLowerCase()} of practice, she has guided working
                  professionals, women navigating hormonal change and senior citizens managing
                  chronic conditions. Her work in oncology nutrition shaped a deep respect for food
                  as clinical support, never as a trend.
                </p>
                <p>
                  Consultations are unhurried. Plans are written, measurable and reviewed. Nothing
                  is prescribed that cannot be explained.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-9 overflow-hidden rounded-[1.8rem] border border-border">
                {journey.map((j, i) => (
                  <div
                    key={j.period}
                    className={cn(
                      "flex gap-5 p-6",
                      i > 0 && "border-t border-border",
                      i === 0 && "bg-brand-tint/60",
                    )}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                      <j.icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="text-[0.68rem] font-bold tracking-[0.2em] text-gold uppercase">
                        {String(i + 1).padStart(2, "0")} · {j.period}
                      </span>
                      <span className="mt-1 block text-[0.92rem] leading-relaxed text-muted-foreground">
                        {j.text}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Areas of specialisation</Eyebrow>
            <h2 className="mt-5 font-display text-3xl text-balance md:text-[2.75rem]">
              Where research meets everyday care
            </h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {specializations.map((s, i) => (
              <Reveal key={s} delay={i * 50}>
                <li className="rounded-full border border-brand/15 bg-brand-tint px-5 py-2.5 text-sm font-bold tracking-wide text-brand">
                  {s}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 rounded-[2rem] border border-brand/15 bg-gold-soft/50 p-8 md:p-12">
          <Reveal className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>Our mission</Eyebrow>
              <p className="mt-4 max-w-2xl font-display text-2xl leading-snug md:text-[1.8rem]">
                “To make natural healing precise, personal and practical — so that every person who
                walks in leaves with clarity about their body and confidence in their next step.”
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild variant="hero" size="pill" className="btn-arrow">
                <Link to="/appointment">
                  Book a consultation <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="pill">
                <a href={clinic.phoneHref}>
                  <Phone className="size-4" /> Call now
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeading
            eyebrow="Why patients stay"
            title="What you can expect"
            description="Four quiet promises that shape every consultation at our clinic."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t, i) => (
              <Reveal key={t.title} delay={i * 70} className="h-full">
                <article className="card-lift h-full rounded-[1.6rem] border border-border bg-card p-7 shadow-soft">
                  <span className="grid size-12 place-items-center rounded-full border border-brand/15 bg-brand-tint text-brand">
                    <t.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
