import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { clinic } from "@/data/clinic";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment | ShushrutamVed Care" },
      {
        name: "description",
        content:
          "Request a naturopathy consultation with Dr. Aarti Sen — in clinic or online. Personalised diet, lifestyle and natural therapy plans.",
      },
      { property: "og:title", content: "Book an Appointment | ShushrutamVed Care" },
      {
        property: "og:description",
        content: "Reserve a consultation with Dr. Aarti Sen, in clinic or online.",
      },
    ],
  }),
  component: Appointment,
});

function Appointment() {
  return (
    <>
      <PageHero
        eyebrow="Appointment"
        title="Reserve your consultation"
        description="Share your details below, or reach us directly on call and WhatsApp. Online consultations are available across India."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
              <h2 className="font-display text-2xl font-semibold">Appointment request</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fields marked as required help us prepare before your visit.
              </p>
              <div className="mt-8">
                <AppointmentForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-6">
            <div className="rounded-3xl border border-border bg-brand-tint/60 p-7">
              <h2 className="font-display text-lg font-semibold">Prefer to talk first?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our care team can help you choose the right programme before you book.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="hero" size="pill">
                  <a href={clinic.phoneHref}>
                    <Phone className="size-4" /> Call {clinic.phone}
                  </a>
                </Button>
                <Button asChild variant="outlineBrand" size="pill">
                  <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" /> WhatsApp Enquiry
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <Clock className="size-4 text-brand" aria-hidden /> Consulting hours
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="text-right font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <MapPin className="size-4 text-brand" aria-hidden /> Clinic address
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{clinic.address}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}