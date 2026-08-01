import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { conditionGroups } from "@/data/clinic";
import leafTexture from "@/assets/leaf-texture.jpg";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions We Treat | ShushrutamVed Care" },
      {
        name: "description",
        content:
          "Natural, lifestyle-led care for weight, thyroid, diabetes, PCOS, acidity, constipation, back and knee pain, arthritis, migraine, stress and sleep.",
      },
      { property: "og:title", content: "Conditions We Treat | ShushrutamVed Care" },
      {
        property: "og:description",
        content: "Sixteen common concerns treated naturally and tracked carefully.",
      },
    ],
  }),
  component: Conditions,
});

function Conditions() {
  return (
    <>
      <PageHero
        eyebrow="Conditions we treat"
        title="Common concerns, treated naturally"
        description="Lifestyle-led protocols for metabolic, hormonal, digestive, musculoskeletal and stress-related conditions — always alongside your treating physician."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {conditionGroups.map((g, i) => (
            <Reveal key={g.group} delay={(i % 2) * 90}>
              <article className="card-lift h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold">{g.group}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {g.items.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 rounded-2xl bg-brand-tint/60 px-4 py-3 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border">
            <img
              src={leafTexture}
              alt="Soft macro texture of layered green leaves"
              width={1600}
              height={900}
              loading="lazy"
              className="h-72 w-full object-cover md:h-96"
            />
            <div className="absolute inset-0 bg-brand/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Not sure which programme fits your condition?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-primary-foreground/85 md:text-base">
                A first consultation will clarify the root cause and the right path forward.
              </p>
              <Button asChild variant="gold" size="pill" className="mt-8">
                <Link to="/appointment">
                  Book Appointment <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}