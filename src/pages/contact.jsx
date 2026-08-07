import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { AppointmentForm } from "@/components/site/AppointmentForm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { clinic } from "@/data/clinic";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact &amp; Visit Us | ShushrutamVed Care</title>
        <meta
          name="description"
          content="Reach ShushrutamVed Care by phone, WhatsApp or email. Clinic address, opening hours, map and appointment enquiry form."
        />
        <meta property="og:title" content="Contact & Visit Us | ShushrutamVed Care" />
        <meta
          property="og:description"
          content="Phone, WhatsApp, email, map and opening hours for ShushrutamVed Care."
        />
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title="We're glad you reached out"
        description="Visit the clinic, call us, or send a WhatsApp message — whichever feels easiest."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Call us", value: clinic.phone, href: clinic.phoneHref },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "Chat with our team",
              href: clinic.whatsapp,
            },
            { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
            {
              icon: MapPin,
              label: "Clinic",
              value: "OM Nagar, Kolar Road, Bhopal",
              href: undefined,
            },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <article className="card-lift h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-base font-semibold">{c.label}</h2>
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-1 block text-sm break-words text-muted-foreground hover:text-brand"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
              Send an enquiry
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tell us what you're dealing with. We'll suggest the right programme and a suitable
              time.
            </p>
            <div className="mt-10">
              <AppointmentForm />
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="ShushrutamVed Care clinic location"
                src={clinic.map}
                loading="lazy"
                className="h-80 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{clinic.address}</p>
              <Button asChild variant="outlineBrand" size="pillSm" className="mt-6 w-full">
                <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> Message on WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
