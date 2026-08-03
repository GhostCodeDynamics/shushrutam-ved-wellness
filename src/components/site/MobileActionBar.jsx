import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { clinic } from "@/data/clinic";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl lg:hidden"
    >
      <div className="grid grid-cols-3">
        <a
          href={clinic.phoneHref}
          className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-foreground active:bg-brand-tint"
        >
          <Phone className="size-5 text-brand" aria-hidden />
          Call
        </a>
        <a
          href={clinic.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-16 flex-col items-center justify-center gap-1 border-x border-border text-xs font-medium text-foreground active:bg-brand-tint"
        >
          <MessageCircle className="size-5 text-brand" aria-hidden />
          WhatsApp
        </a>
        <Link
          to="/appointment"
          className="flex min-h-16 flex-col items-center justify-center gap-1 bg-brand text-xs font-medium text-primary-foreground"
        >
          <CalendarCheck className="size-5" aria-hidden />
          Book
        </Link>
      </div>
    </nav>
  );
}
