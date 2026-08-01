import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border bg-brand-tint/60">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.24em] text-brand uppercase">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] font-semibold text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}