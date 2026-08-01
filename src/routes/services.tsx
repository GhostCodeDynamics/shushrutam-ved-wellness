import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { services, processSteps } from "@/data/clinic";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Naturopathy & Wellness Services | ShushrutamVed Care" },
      {
        name: "description",
        content:
          "Naturopathy consultation, diet counselling, yoga therapy, detox, weight, thyroid, diabetes, digestive and women's wellness programmes.",
      },
      { property: "og:title", content: "Naturopathy & Wellness Services | ShushrutamVed Care" },
      {
        property: "og:description",
        content: "Twelve personalised wellness programmes rooted in natural healing.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Wellness programmes, personally written"
        description="Each programme is shaped around your reports, your routine and your kitchen — combining nutrition, movement, breathwork and natural therapies."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <article className="card-lift group h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.24em] text-brand uppercase">
              How care unfolds
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold md:text-4xl">
              A guided, four-step journey
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} as="li">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid size-11 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <Button asChild variant="hero" size="pill">
              <Link to="/appointment">
                Start with a consultation <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}