import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { clinic } from "@/data/clinic";

const quickActions = [
  {
    icon: CalendarCheck,
    label: "Book a consultation",
    message: "Hi, I'd like to book a consultation.",
  },
  {
    icon: Sparkles,
    label: "Ask about treatments",
    message: "Hi, I'd like to know more about your treatments.",
  },
  {
    icon: Clock,
    label: "Clinic timings",
    message: "Hi, what are the clinic timings and consultation hours?",
  },
  {
    icon: MapPin,
    label: "Reach the clinic",
    message: "Hi, could you share directions or the exact clinic address?",
  },
];

function waLink(message) {
  const text = encodeURIComponent(message);
  return `${clinic.whatsapp}?text=${text}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 sm:right-6 lg:bottom-6">
      <div
        role="dialog"
        aria-modal={open ? "true" : "false"}
        aria-hidden={!open}
        aria-label={`Chat with ${clinic.doctor}`}
        className={`origin-bottom-right rounded-[1.6rem] border border-border bg-card shadow-lift transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto w-[calc(100vw-2rem)] max-w-xs translate-y-0 scale-100 opacity-100 sm:w-80"
            : "pointer-events-none w-80 translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="rounded-t-[1.6rem] bg-brand-deep px-5 py-4 text-cream">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Typically replies within a few minutes
          </p>
          <p className="mt-1.5 font-display text-lg leading-tight">{clinic.doctor}</p>
          <p className="text-xs text-cream/70">{clinic.tagline}</p>
        </div>

        <div className="space-y-3 px-4 py-4">
          <p className="text-[0.8rem] leading-relaxed text-muted-foreground">
            Pick an option — we'll open WhatsApp with your message ready to send.
          </p>
          <div className="grid gap-2">
            {quickActions.map((a) => (
              <a
                key={a.label}
                href={waLink(a.message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand/15 bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-cream">
                  <a.icon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-medium">{a.label}</span>
                <ExternalLink
                  className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={clinic.phoneHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-brand-deep"
            >
              <Phone className="size-4" aria-hidden /> Call now
            </a>
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand/25 bg-card text-sm font-semibold text-brand transition-all duration-300 hover:bg-brand-tint"
            >
              <CalendarCheck className="size-4" aria-hidden /> Book visit
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat window" : "Chat with us on WhatsApp"}
        className="group relative grid size-14 place-items-center rounded-full bg-brand text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {!open && (
          <span className="absolute -top-1 -right-1 flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex size-4 rounded-full bg-gold" />
          </span>
        )}
        {open ? (
          <X
            className="size-6 transition-transform duration-300 group-hover:rotate-90"
            aria-hidden
          />
        ) : (
          <MessageCircle className="size-6" aria-hidden />
        )}
      </button>
    </div>
  );
}
