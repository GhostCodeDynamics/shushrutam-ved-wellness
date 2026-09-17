import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { AppointmentForm } from "@/components/site/AppointmentForm";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/Premium";
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

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
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
            <Reveal key={c.label} delay={i * 70} className="h-full">
              <article className="card-lift group h-full rounded-[1.6rem] border border-border bg-card p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full border border-brand/15 bg-brand-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-cream">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-lg">{c.label}</h2>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-1 block text-sm break-words font-semibold text-muted-foreground transition-colors hover:text-brand"
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

        <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-10">
              <Eyebrow>Send an enquiry</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-[2.4rem]">
                Tell us what you're dealing with
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                We'll suggest the right programme and a suitable time.
              </p>
              <div className="mt-8">
                <AppointmentForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-border shadow-soft">
              <iframe
                title="ShushrutamVed Care clinic location"
                src={clinic.map}
                loading="lazy"
                className="h-72 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/85 py-2 pr-5 pl-2 text-xs font-semibold text-cream backdrop-blur">
                <span className="grid size-7 place-items-center rounded-full bg-gold text-ink">
                  <MapPin className="size-3.5" aria-hidden />
                </span>
                Kolar Road, Bhopal
              </div>
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
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{clinic.address}</p>
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
