import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Mail, Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Conditions", to: "/conditions" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "hidden overflow-hidden bg-brand-deep text-cream transition-all duration-500 md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[0.72rem] tracking-wide">
          <div className="flex min-w-0 items-center gap-6">
            <a
              href={clinic.phoneHref}
              className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
            >
              <Phone className="size-3.5 shrink-0" aria-hidden />
              {clinic.phone}
            </a>
            <a
              href={`mailto:${clinic.email}`}
              className="hidden items-center gap-2 opacity-90 transition-opacity hover:opacity-100 lg:flex"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden />
              {clinic.email}
            </a>
          </div>
          <p className="flex items-center gap-2 opacity-80">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            Mon–Sat · 9:00 AM – 7:00 PM · Bhopal + Online
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-cream/85 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-border/80 bg-[#FCFCF8]/95 py-0 shadow-[0_12px_40px_-20px_rgb(24_49_38/0.25)]"
            : "border-transparent py-1",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:px-6">
          <Logo />

          <div className="flex items-center gap-2 md:gap-3">
            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              {nav.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline rounded-full px-4 py-2.5 text-[0.9rem] font-semibold transition-colors",
                      active ? "text-brand" : "text-ink/70 hover:text-brand",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Button
              asChild
              variant="hero"
              size="pillSm"
              className="btn-arrow hidden sm:inline-flex"
            >
              <Link to="/appointment">
                Book Appointment <ArrowUpRight className="size-4" />
              </Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="quiet"
                  size="icon"
                  className="rounded-full border border-border lg:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[88vw] max-w-sm flex-col border-l-border bg-[#FCFCF8] p-0"
              >
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center justify-between border-b border-border bg-cream/60 px-5 py-4">
                  <Logo compact className="max-w-[75%]" />
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-brand-tint"
                  >
                    <X className="size-5 text-ink" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
                  <p className="px-4 pt-2 pb-3 text-[0.7rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                    Menu
                  </p>
                  {nav.map((item, i) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl transition-colors",
                        pathname === item.to
                          ? "bg-brand text-cream"
                          : "text-ink hover:bg-brand-tint",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "text-xs font-sans font-bold tracking-widest opacity-50",
                          pathname === item.to ? "text-cream" : "text-muted-foreground",
                        )}
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  ))}
                </nav>
                <div className="space-y-3 border-t border-border bg-cream/60 p-5 pb-8">
                  <Button asChild variant="hero" size="pill" className="w-full">
                    <Link to="/appointment" onClick={() => setOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>
                  <a
                    href={clinic.phoneHref}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-brand"
                  >
                    <Phone className="size-4" /> {clinic.phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
