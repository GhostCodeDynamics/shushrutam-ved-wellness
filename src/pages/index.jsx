import { ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import aboutNature from "@/assets/about-nature.jpg";
import doctorHero from "@/assets/doctor-hero.png";
import { AppointmentForm } from "@/components/site/AppointmentForm";
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

function SectionHeading({ eyebrow, title, description, center = true }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold tracking-[0.24em] text-brand uppercase">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight font-semibold text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </Reveal>
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand-tint blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 -left-40 size-[30rem] rounded-full bg-gold-soft blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-5 pb-20 lg:grid-cols-2 lg:pt-10 lg:pb-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-brand shadow-soft">
              <span className="size-1.5 rounded-full bg-secondary" />
              {clinic.experience} · {clinic.qualification}
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-foreground sm:text-5xl lg:text-6xl">
              Natural Healing for a <span className="text-brand italic">Healthier Life</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Naturopathy, clinical nutrition and lifestyle medicine — thoughtfully combined by{" "}
              {clinic.doctor} to treat the root cause, not just the symptom. Calm, personalised care
              for modern living.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="pill">
                <Link to="/appointment">
                  Book Appointment <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="pill">
                <a href={clinic.phoneHref}>
                  <Phone className="size-4" /> Call Now
                </a>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "6+", v: "Years of practice" },
                { k: "12", v: "Wellness programmes" },
                { k: "16", v: "Conditions treated" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-semibold text-brand">{s.k}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative mx-auto max-w-sm lg:max-w-[26rem]">
              <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lift">
                <img
                  src={doctorHero}
                  alt={`${clinic.doctor}, naturopathy and lifestyle medicine consultant`}
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-4 rounded-3xl border border-border bg-card/95 px-6 py-2.5 shadow-soft backdrop-blur sm:left-8">
                <p className="font-display text-base font-semibold">{clinic.doctor}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {clinic.qualification} · Naturopathy & Lifestyle Medicine
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* About doctor */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.24em] text-brand uppercase">
              About the doctor
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold md:text-4xl">
              Science-trained. Nature-guided.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {clinic.doctor} brings a rare combination to wellness care — a research background in{" "}
              {clinic.qualification} alongside {clinic.experience} of naturopathic and lifestyle
              practice. Her work in molecular research, plant tissue culture and oncology nutrition
              shapes a method that is gentle in approach and rigorous in reasoning.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Her mission is simple: help people reclaim health through daily choices — real food,
              restorative sleep, mindful movement and calm breathing — with plans they can sustain.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {specializations.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-brand/15 bg-brand-tint px-4 py-2 text-xs font-medium text-brand"
                >
                  {s}
                </li>
              ))}
            </ul>
            <Button asChild variant="outlineBrand" size="pill" className="mt-9">
              <Link to="/about">
                Read full profile <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2.5rem] border border-border shadow-soft">
              <img
                src={aboutNature}
                alt="Fresh herbs, seeds and infused water arranged on natural linen"
                width={1200}
                height={912}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-tint/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our services"
            title="Programmes designed around your life"
            description="Every plan begins with listening — then blends nutrition, movement, breathwork and natural therapies into a routine that fits you."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 80}>
                <article className="card-lift group h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow="Conditions we treat"
          title="Concerns we see every week"
          description="From metabolic and hormonal imbalance to pain, digestion and sleep — treated naturally, and tracked carefully."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {conditionGroups.map((g, i) => (
            <Reveal key={g.group} delay={i * 80}>
              <article className="card-lift h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h3 className="font-display text-lg font-semibold">{g.group}</h3>
                <ul className="mt-5 space-y-3">
                  {g.items.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Treatment process" title="Four calm steps to lasting change" />
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} as="li">
                <div className="relative h-full rounded-3xl border border-border bg-background p-7">
                  <span className="grid size-11 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow="FAQ" title="Questions people ask before booking" />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-border bg-card px-6 shadow-soft"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-16 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-secondary/30 blur-3xl"
            />
            <h2 className="relative font-display text-3xl leading-tight font-semibold text-primary-foreground md:text-4xl">
              Ready to begin your healing journey?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              Book a consultation and receive a personalised naturopathy and lifestyle plan built
              entirely around you.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gold" size="pill">
                <Link to="/appointment">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="pill"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp Enquiry
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.24em] text-brand uppercase">
              Book a visit
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold md:text-4xl">
              Request an appointment
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Share a few details and our care team will confirm a slot that suits you — in clinic
              or online.
            </p>
            <div className="mt-10">
              <AppointmentForm />
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h3 className="font-display text-lg font-semibold">Clinic details</h3>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  {clinic.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <a href={clinic.phoneHref} className="hover:text-brand">
                    {clinic.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <a href={`mailto:${clinic.email}`} className="hover:text-brand">
                    {clinic.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <Clock className="size-4 text-brand" aria-hidden /> Opening hours
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="text-right font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Clinic location map"
                src={clinic.map}
                loading="lazy"
                className="h-72 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
