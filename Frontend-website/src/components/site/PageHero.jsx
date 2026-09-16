import { Link } from "react-router-dom";

import { Eyebrow } from "./Premium";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function PageHero({ eyebrow, title, description, action }) {
  return (
    <section className="texture-grain relative overflow-hidden border-b border-brand/10 bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-4rem] size-[22rem] rounded-full bg-brand-tint blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8rem] left-[-5rem] size-[20rem] rounded-full bg-sand blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 400 120"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-brand/[0.07]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 C 80 20, 160 110, 240 60 S 340 30, 400 75 L400 120 L0 120 Z"
          fill="currentColor"
        />
      </svg>
      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
        <Reveal>
          <Eyebrow center>{eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-balance text-ink md:text-[3.4rem]">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {description}
          </p>
          {action && <div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div>}
          <p className="mt-8 text-[0.72rem] font-bold tracking-[0.24em] text-muted-foreground/70 uppercase">
            <Link to="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span aria-hidden className="mx-2 text-brand/40">
              /
            </span>
            <span className={cn("text-brand")}>{eyebrow}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
