import { ArrowUpRight, Clock, Leaf, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/site/Logo";
import { clinic, services } from "@/data/clinic";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-deep text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-6rem] size-[26rem] rounded-full bg-brand-soft/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-8rem] size-[22rem] rounded-full bg-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
          <div>
            <Logo asLink={false} tone="light" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-cream/75">
              A calm, evidence-informed naturopathy practice led by {clinic.doctor} — helping you
              heal naturally through food, movement, breath and rest.
            </p>
            <p className="mt-6 font-display text-2xl leading-snug text-cream/95 italic md:text-[1.7rem]">
              “Modern wellness,
              <br />
              rooted in nature.”
            </p>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-[0.72rem] font-bold tracking-[0.22em] text-gold uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-cream/80">
              {[
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Conditions We Treat", to: "/conditions" },
                { label: "Wellness Journal", to: "/blog" },
                { label: "Appointment", to: "/appointment" },
                { label: "FAQ", to: "/faq" },
                { label: "Privacy Policy", to: "/privacy" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h3 className="text-[0.72rem] font-bold tracking-[0.22em] text-gold uppercase">
              Programs
            </h3>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-cream/80">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link to="/services" className="transition-colors hover:text-cream">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.72rem] font-bold tracking-[0.22em] text-gold uppercase">
              Visit the clinic
            </h3>
            <ul className="mt-5 space-y-4 text-[0.92rem] text-cream/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>{clinic.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <a href={clinic.phoneHref} className="transition-colors hover:text-cream">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={clinic.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cream"
                >
                  WhatsApp enquiry <ArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={`mailto:${clinic.email}`}
                  className="break-all transition-colors hover:text-cream"
                >
                  {clinic.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-cream/15 bg-cream/8 p-4 text-[0.85rem]">
              <p className="flex items-center gap-2 font-semibold text-cream">
                <Clock className="size-4 text-gold" aria-hidden /> Consulting hours
              </p>
              <p className="mt-2 text-cream/70">
                Mon–Fri · 9 AM – 7 PM
                <br />
                Sat · 9 AM – 4 PM · Sun · Online only
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 text-cream/40" aria-hidden>
          <Leaf className="size-4" />
          <span className="h-px flex-1 bg-cream/15" />
          <Leaf className="size-4 rotate-180" />
        </div>

        <div className="flex flex-col gap-2 pt-6 pb-20 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <div className="flex flex-col gap-1">
            <p>
              © {new Date().getFullYear()} {clinic.name}. All Rights Reserved.
            </p>
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://ghostcodedynamics.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cream/80 transition-colors hover:text-gold hover:underline underline-offset-4"
              >
                GhostCode Dynamics
              </a>
            </p>
          </div>
          <p className="max-w-sm sm:text-right">
            Naturopathy and lifestyle guidance. Not a substitute for emergency medical care.
          </p>
        </div>
      </div>
    </footer>
  );
}
