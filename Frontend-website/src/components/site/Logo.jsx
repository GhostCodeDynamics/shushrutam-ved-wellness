import { Link } from "react-router-dom";

import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";

const SIZES = {
  default: {
    icon: "h-12 w-12 md:h-14 md:w-14",
    name: "text-[0.95rem] md:text-base",
  },
  compact: {
    icon: "h-10 w-10",
    name: "text-[0.8rem]",
  },
};

export function Logo({ className, compact = false, asLink = true, tone = "dark" }) {
  const { icon: iconSize, name: nameSize } = SIZES[compact ? "compact" : "default"];
  const light = tone === "light";

  const icon = (
    <img
      src="/assets/logo/icon.png"
      alt={`${clinic.name} logo`}
      width={500}
      height={500}
      draggable={false}
      className={cn("shrink-0 object-contain", iconSize)}
    />
  );

  const lockup = (
    <>
      {icon}

      <span className="flex min-w-0 items-center gap-2.5">
        {/* Vertical Divider */}
        <span
          aria-hidden
          className={cn(
            "h-9 min-w-0.5 shrink-0 rounded-full",
            light ? "bg-cream/25" : "bg-brand/20",
          )}
        />

        {/* Text */}
        <span className="flex min-w-0 flex-col justify-center">
          <span
            className={cn(
              "truncate font-display leading-tight",
              light ? "text-cream" : "text-ink",
              nameSize,
            )}
          >
            {clinic.name}
          </span>

          <span
            className={cn(
              "truncate text-[0.6rem]",
              light ? "text-cream/60" : "text-muted-foreground",
            )}
          >
            by {clinic.doctor}
          </span>
        </span>
      </span>
    </>
  );

  const groupClassName = cn("flex min-w-0 items-center gap-0", className);

  if (!asLink) {
    return <div className={groupClassName}>{lockup}</div>;
  }

  return (
    <Link to="/" aria-label={clinic.name} className={groupClassName}>
      {lockup}
    </Link>
  );
}
