import { useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow, SectionHeading } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/components/site/Seo";
import { useApiConditionGroups } from "@/lib/apiContent";
import { clinicSchema } from "@/lib/seo-schemas";
import { cn } from "@/lib/utils";

const groupDescriptions = {
  "Metabolic & Hormonal":
    "We support metabolic and hormonal balance through nutrition, movement and sleep — with gentle, measurable checkpoints for weight, thyroid, PCOS and more.",
  "Digestive Health":
    "Digestive relief starts with rhythm — meal timing, chewing, hydration and gut-friendly food — so acidity, gas and constipation resolve rather than return.",
  "Pain & Mobility":
    "We address pain through posture, movement retraining and natural therapies — supporting strength and mobility without dependency.",
  "Mind & Sleep":
    "Calming the nervous system through breathwork, sleep hygiene and daily anchors — helping migraine, stress, anxiety and insomnia unwind.",
};

export default function Conditions() {
  const [active, setActive] = useState(0);
  const conditionGroups = useApiConditionGroups();
  const allConditions = conditionGroups.flatMap((g) => g.items);
  const group = conditionGroups[active];

  return (
    <>
      <Seo
        title="Conditions We Treat | ShushrutamVed Care"
        description="Natural, lifestyle-led care for weight, thyroid, diabetes, PCOS, acidity, constipation, back and knee pain, arthritis, migraine, stress and sleep."
        path="/conditions"
        jsonLd={[clinicSchema("/conditions")]}
      />

      <PageHero
        eyebrow="Conditions we treat"
        title="Common concerns, treated naturally"
        description="Lifestyle-led protocols for metabolic, hormonal, digestive, musculoskeletal and stress-related conditions — always alongside your treating physician."
      />

      <section className="texture-grain bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Sixteen concerns</Eyebrow>
                <h2 className="mt-5 font-display text-4xl leading-[1.08] text-balance md:text-[3rem]">
                  Choose a concern to see how <span className="text-brand italic">we help</span>
                </h2>
                <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
                  Every condition below is treated with a written, measurable protocol built around
                  your reports, kitchen and daily rhythm — never a generic diet sheet.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <ul className="mt-8 space-y-2.5">
                  {conditionGroups.map((g, i) => (
                    <li key={g.group}>
                      <button
                        onClick={() => setActive(i)}
                        aria-pressed={active === i}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between rounded-2xl border px-5 py-3.5 text-left transition-all duration-300",
                          active === i
                            ? "border-brand bg-brand text-cream shadow-soft"
                            : "border-border bg-card text-ink hover:border-brand/40",
                        )}
                      >
                        <span className="flex items-center gap-3 font-display text-lg">
                          <span
                            className={cn(
                              "font-sans text-xs font-bold",
                              active === i ? "text-gold" : "text-muted-foreground",
                            )}
                          >
                            0{i + 1}
                          </span>
                          {g.group}
                        </span>
                        <span
                          className={cn(
                            "grid size-8 place-items-center rounded-full border transition-transform duration-300",
                            active === i ? "rotate-45 border-cream/30" : "border-border",
                          )}
                        >
                          <Plus className="size-3.5" aria-hidden />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl border border-brand/15 bg-brand-tint/70 p-5">
                  <p className="text-sm leading-relaxed text-ink/80">
                    <span className="font-bold text-brand">{"Don't see yours?"}</span> Conditions
                    often overlap — a first consultation will map your symptoms to the right path.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="h-full">
              <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
                <p className="text-[0.7rem] font-bold tracking-[0.24em] text-gold uppercase">
                  {String(active + 1).padStart(2, "0")} · {group.group}
                </p>
                <h3 className="mt-3 font-display text-3xl">{group.group}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {groupDescriptions[group.group] ||
                    "We work on these from the root — through nutrition, movement, sleep and natural therapies — with clear checkpoints at every follow-up."}
                </p>
                <ul className="mt-8 grid flex-1 content-start gap-3 sm:grid-cols-2">
                  {group.items.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-3 rounded-2xl border border-brand/12 bg-brand-tint/60 px-4 py-3.5 text-[0.92rem] font-semibold text-ink"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-cream">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                  <Button asChild variant="hero" size="pill" className="btn-arrow">
                    <Link to="/appointment">
                      Book a consultation <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outlineBrand" size="pill">
                    <Link to="/services">Compare programmes</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <SectionHeading
            eyebrow="At a glance"
            title={`All ${allConditions.length} concerns we support`}
            description="Grouped for clarity — most patients connect with two or three at once, and one integrated plan addresses them together."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {conditionGroups.map((g, i) => (
              <Reveal key={g.group} delay={i * 70} className="h-full">
                <article className="card-lift flex h-full flex-col rounded-[1.6rem] border border-border bg-card p-7 shadow-soft">
                  <p className="font-display text-sm text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-xl">{g.group}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
