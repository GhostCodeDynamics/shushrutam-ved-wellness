import { Link } from "react-router-dom";

import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";

const BRAND_TAGLINE = "Natural Healing • Lifestyle Wellness";

const SIZES = {
  default: {
    icon: "h-12 w-12 md:h-14 md:w-14",
    name: "text-[1.05rem] md:text-xl",
  },
  compact: {
    icon: "h-10 w-10",
    name: "text-sm",
  },
};

export function Logo({ className, compact = false, asLink = true }) {
  const { icon: iconSize, name: nameSize } = SIZES[compact ? "compact" : "default"];

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

      <span className="flex min-w-0 items-center gap-3">
        {/* Vertical Divider */}
        <span aria-hidden className="h-11 min-w-0.5 shrink-0 rounded-full bg-brand/20" />

        {/* Text */}
        <span className="flex min-w-0 flex-col justify-center">
          <span className={cn("truncate font-display leading-tight text-ink", nameSize)}>
            {clinic.name}
          </span>

          <span className="mt-0.5 text-[0.68rem] font-semibold tracking-[0.14em] text-brand uppercase">
            {BRAND_TAGLINE}
          </span>

          <span className="text-[0.65rem] text-muted-foreground">by {clinic.doctor}</span>
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

// import { Link } from "react-router-dom";

// import { clinic } from "@/data/clinic";
// import { cn } from "@/lib/utils";

// const BRAND_TAGLINE = "Natural Healing • Lifestyle Wellness";

// const SIZES = {
//   default: {
//     icon: "h-16 w-16 sm:h-20 sm:w-20",
//     name: "text-sm md:text-base",
//   },
//   compact: {
//     icon: "h-11 w-11 sm:h-14 sm:w-14",
//     name: "text-xs",
//   },
// };

// export function Logo({ className, compact = false, asLink = true }) {
//   const { icon: iconSize, name: nameSize } = SIZES[compact ? "compact" : "default"];

//   const icon = (
//     <img
//       src="/assets/logo/icon.png"
//       alt={`${clinic.name} logo`}
//       width={500}
//       height={500}
//       draggable={false}
//       className={cn("shrink-0 object-contain", iconSize)}
//     />
//   );

//   const lockup = (
//     <>
//       {icon}
//       <span className="flex min-w-0 items-center gap-1 sm:gap-2">
//         <span aria-hidden className="w-0.5 shrink-0 self-stretch rounded-full bg-border" />
//         <span className="flex min-w-0 flex-col justify-center leading-none">
//           <span
//             className={cn("truncate font-display font-semibold leading-tight text-brand", nameSize)}
//           >
//             {clinic.name}
//           </span>
//           <span className="truncate text-[11px] text-brand/80">{BRAND_TAGLINE}</span>
//           <span className="truncate text-[10px] text-muted-foreground">by {clinic.doctor}</span>
//         </span>
//       </span>
//     </>
//   );

//   const groupClassName = cn("flex min-w-0 items-center gap-1 sm:gap-2", className);

//   if (!asLink) {
//     return <div className={groupClassName}>{lockup}</div>;
//   }

//   return (
//     <Link to="/" aria-label={clinic.name} className={groupClassName}>
//       {lockup}
//     </Link>
//   );
// }
