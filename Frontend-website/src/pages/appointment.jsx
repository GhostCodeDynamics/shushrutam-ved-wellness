import { Clock, MapPin, MessageCircle, Phone, Video } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { AppointmentForm } from "@/components/site/AppointmentForm";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { clinic } from "@/data/clinic";

export default function Appointment() {
  return (
    <>
      <Helmet>
        <title>Book an Appointment | ShushrutamVed Care</title>
        <meta
          name="description"
          content="Request a naturopathy consultation with Dr. Aarti Sen — in clinic or online. Personalised diet, lifestyle and natural therapy plans."
        />
        <meta property="og:title" content="Book an Appointment | ShushrutamVed Care" />
        <meta
          property="og:description"
          content="Reserve a consultation with Dr. Aarti Sen, in clinic or online."
        />
      </Helmet>

      <PageHero
        eyebrow="Appointment"
        title="Reserve your consultation"
        description="Share your details below, or reach us directly on call and WhatsApp. Online consultations are available across India."
      />

      <section className="texture-grain bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <Reveal>
              <div className="h-full rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-10">
                <Eyebrow>Request an appointment</Eyebrow>
                <h2 className="mt-4 font-display text-3xl leading-tight md:text-[2.4rem]">
                  Tell us a little about you
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Fields marked as required help us prepare before your visit.
                </p>
                <div className="mt-8">
                  <AppointmentForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-5">
              <div className="rounded-[1.8rem] border border-brand/15 bg-brand-deep p-7 text-cream">
                <h2 className="font-display text-xl">Prefer to talk first?</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">
                  Our care team can help you choose the right programme before you book.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild variant="gold" size="pill" className="btn-arrow">
                    <a href={clinic.phoneHref}>
                      <Phone className="size-4" /> Call {clinic.phone}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="pill"
                    variant="outline"
                    className="border-cream/35 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
                  >
                    <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                      <MessageCircle className="size-4" /> WhatsApp Enquiry
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl">
                  <Clock className="size-5 text-brand" aria-hidden /> Consulting hours
                </h2>
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
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-brand-tint/60 p-3 text-xs leading-relaxed text-ink/80">
                  <Video className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  Online consultations available across India with the same personalised plan.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl">
                  <MapPin className="size-5 text-brand" aria-hidden /> Clinic address
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {clinic.address}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
