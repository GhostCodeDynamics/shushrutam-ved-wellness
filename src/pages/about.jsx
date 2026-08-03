import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import doctorHero from "@/assets/about-doctor-image.png";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { clinic, specializations, trustPoints } from "@/data/clinic";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Dr. Aarti Sen | ShushrutamVed Care</title>
        <meta
          name="description"
          content="Meet Dr. Aarti Sen, M.Sc. Biotechnology with 6+ years in naturopathy, lifestyle medicine, oncology nutrition and wellness at ShushrutamVed Care."
        />
        <meta property="og:title" content="About Dr. Aarti Sen | ShushrutamVed Care" />
        <meta
          property="og:description"
          content="Science-trained, nature-guided naturopathy and lifestyle medicine."
        />
      </Helmet>

      <PageHero
        eyebrow="About"
        title="Science-trained, nature-guided care"
        description={`${clinic.doctor} blends research rigour with the quiet wisdom of natural healing — for people who want lasting change, not quick fixes.`}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] border border-border shadow-lift">
              <img
                src={doctorHero}
                alt={`${clinic.doctor} at ShushrutamVed Care`}
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
              {clinic.doctor}
            </h2>
            <p className="mt-2 text-sm tracking-[0.14em] text-brand uppercase">
              {clinic.qualification} · {clinic.experience}
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Dr. Aarti Sen began in laboratories — molecular research and plant tissue culture —
                studying how living systems repair themselves. That curiosity led her to
                naturopathy, where the same principle applies at human scale: given the right
                conditions, the body restores balance.
              </p>
              <p>
                Over {clinic.experience.toLowerCase()} of practice, she has guided working
                professionals, women navigating hormonal change and senior citizens managing chronic
                conditions. Her work in oncology nutrition shaped a deep respect for food as
                clinical support, never as a trend.
              </p>
              <p>
                Consultations are unhurried. Plans are written, measurable and reviewed. Nothing is
                prescribed that cannot be explained.
              </p>
            </div>

            <h3 className="mt-10 font-display text-lg font-semibold">Areas of specialisation</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {specializations.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-brand/15 bg-brand-tint px-4 py-2 text-xs font-medium text-brand"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl border border-border bg-gold-soft/60 p-7">
              <h3 className="font-display text-lg font-semibold">Our mission</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To make natural healing precise, personal and practical — so that every person who
                walks in leaves with clarity about their body and confidence in their next step.
              </p>
            </div>

            <Button asChild variant="hero" size="pill" className="mt-10">
              <Link to="/appointment">
                Book a consultation <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <article className="card-lift h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                  <t.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
