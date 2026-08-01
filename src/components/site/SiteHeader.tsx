import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, Mail, Clock, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-brand text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-6">
            <a href={clinic.phoneHref} className="flex items-center gap-2 hover:opacity-80">
              <Phone className="size-3.5 shrink-0" aria-hidden />
              {clinic.phone}
            </a>
            <a href={`mailto:${clinic.email}`} className="flex items-center gap-2 hover:opacity-80">
              <Mail className="size-3.5 shrink-0" aria-hidden />
              {clinic.email}
            </a>
          </div>
          <p className="flex items-center gap-2 opacity-90">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            Mon–Sat · 9:00 AM – 7:00 PM
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-transparent bg-background/80 backdrop-blur-xl transition-all duration-300",
          scrolled && "border-border/70 bg-background/95 shadow-soft",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:px-6 md:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand">
              <Leaf className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold text-foreground md:text-lg">
                {clinic.name}
              </span>
              <span className="block truncate text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {clinic.tagline}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-brand-tint hover:text-brand",
                    pathname === item.to && "bg-brand-tint text-brand",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild variant="hero" size="pillSm" className="hidden sm:inline-flex">
              <Link to="/appointment">Book Appointment</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="quiet" size="icon" className="rounded-full lg:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm border-l-border bg-card p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                  <span className="font-display text-lg font-semibold">{clinic.name}</span>
                  <button onClick={() => setOpen(false)} aria-label="Close menu">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-brand-tint hover:text-brand",
                        pathname === item.to && "bg-brand-tint text-brand",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button asChild variant="hero" size="pill" className="mt-4 w-full">
                    <Link to="/appointment" onClick={() => setOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}