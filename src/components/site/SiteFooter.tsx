import { Link } from "@tanstack/react-router";
import { Leaf, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { clinic, services } from "@/data/clinic";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-brand-tint text-brand">
              <Leaf className="size-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">{clinic.name}</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A calm, evidence-informed naturopathy practice led by {clinic.doctor} — helping you heal
            naturally through food, movement, breath and rest.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.14em] uppercase">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              { label: "About", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Conditions We Treat", to: "/conditions" },
              { label: "Appointment", to: "/appointment" },
              { label: "FAQ", to: "/faq" },
              { label: "Privacy Policy", to: "/privacy" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.14em] uppercase">
            Programs
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {services.slice(0, 6).map((s) => (
              <li key={s.title}>
                <Link to="/services" className="transition-colors hover:text-brand">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.14em] uppercase">Visit</h3>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>{clinic.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={clinic.phoneHref} className="hover:text-brand">
                {clinic.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={clinic.whatsapp} className="hover:text-brand">
                WhatsApp enquiry
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
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 pb-24 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <p>Naturopathy and lifestyle guidance. Not a substitute for emergency medical care.</p>
        </div>
      </div>
    </footer>
  );
}