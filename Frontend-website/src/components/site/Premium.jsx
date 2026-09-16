import { Leaf } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, center = false, className, light = false }) {
  return (
    <p
      className={cn(
        center ? "eyebrow-center" : "eyebrow",
        light && "text-cream",
        "justify-start",
        center && "justify-center",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
  className,
}) {
  return (
    <Reveal className={cn(center ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      <Eyebrow center={center} light={light}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-[2rem] leading-[1.12] text-balance md:text-[2.75rem]",
          light ? "text-cream" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[1.02rem] leading-relaxed text-pretty",
            light ? "text-cream/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function LeafDivider({ className }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-12 bg-brand/20" />
      <span className="grid size-8 place-items-center rounded-full border border-brand/20 bg-brand-tint text-brand">
        <Leaf className="size-3.5" />
      </span>
      <span className="h-px w-12 bg-brand/20" />
    </div>
  );
}

export function BotanicalRing({ className }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 7"
      />
      <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
