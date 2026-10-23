import { useState } from "react";
import { Camera, Leaf } from "lucide-react";

import { SectionHeading } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { SITE_IMAGES, ik } from "@/lib/media";
import { cn } from "@/lib/utils";

const GALLERY = [
  {
    src: SITE_IMAGES.clinicReception,
    alt: "Reception and front desk at ShushrutamVed Care clinic",
    label: "Reception",
  },
  {
    src: SITE_IMAGES.clinicConsultation,
    alt: "Consultation room at the clinic, with a desk and indoor plants",
    label: "Consultation room",
  },
  {
    src: SITE_IMAGES.clinicTherapy,
    alt: "Quiet therapy room prepared for a wellness session",
    label: "Therapy room",
  },
  {
    src: SITE_IMAGES.clinicDispensary,
    alt: "Wooden shelves of herbal formulations in the clinic dispensary",
    label: "Herbal dispensary",
  },
  {
    src: SITE_IMAGES.clinicWaiting,
    alt: "Patient waiting lounge with natural light and greenery",
    label: "Waiting lounge",
  },
  {
    src: SITE_IMAGES.clinicEntrance,
    alt: "Entrance of the ShushrutamVed Care clinic in Kolar Road, Bhopal",
    label: "Entrance",
  },
];

const CONTACT_ITEMS = [GALLERY[0], GALLERY[5], GALLERY[4]];

function ClinicPhoto({ item, featured = false, compact = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={cn(
        "clinic-photo group relative h-full overflow-hidden border border-brand/15 bg-card shadow-soft hover:shadow-lift",
        compact ? "rounded-xl" : "rounded-[1.6rem]",
      )}
    >
      {failed ? (
        <div
          className={cn(
            "grid place-items-center gap-1.5 bg-brand-tint px-3 text-center",
            compact
              ? "aspect-square"
              : featured
                ? "aspect-[16/10] lg:aspect-auto lg:h-full"
                : "aspect-[4/3] lg:aspect-auto lg:h-full",
          )}
        >
          <Leaf className="size-5 text-brand/60" aria-hidden />
          {!compact && (
            <span className="font-display text-base leading-tight text-brand/85">{item.label}</span>
          )}
          <span className="text-[0.68rem] font-semibold tracking-wide text-brand/60">
            Photo coming soon
          </span>
        </div>
      ) : (
        <img
          src={ik(item.src, compact ? 320 : featured ? 1280 : 720)}
          srcSet={
            compact
              ? `${ik(item.src, 240)} 240w, ${ik(item.src, 400)} 400w`
              : featured
                ? `${ik(item.src, 640)} 640w, ${ik(item.src, 960)} 960w, ${ik(item.src, 1280)} 1280w`
                : `${ik(item.src, 400)} 400w, ${ik(item.src, 720)} 720w, ${ik(item.src, 960)} 960w`
          }
          sizes={
            compact
              ? "(min-width: 640px) 120px, 30vw"
              : featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, 50vw"
          }
          alt={item.alt}
          width={featured ? 1536 : 960}
          height={featured ? 1024 : 720}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            "w-full object-cover brightness-100 transition-[transform,filter] duration-700 group-hover:brightness-105",
            compact
              ? "aspect-square group-hover:scale-[1.04]"
              : featured
                ? "clinic-photo-kenburns aspect-[16/10] lg:aspect-auto lg:h-full"
                : "aspect-[4/3] group-hover:scale-[1.04] lg:aspect-auto lg:h-full",
          )}
        />
      )}

      {compact && <figcaption className="sr-only">{item.label}</figcaption>}
      {!compact && !failed && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent px-5 pt-10 pb-4 text-xs font-semibold tracking-wide text-cream">
          {item.label}
        </figcaption>
      )}
    </figure>
  );
}

export function ClinicGallery({ variant = "home", title, subtitle, className }) {
  const isContact = variant === "contact";
  const heading = title ?? (isContact ? "Inside the clinic" : "A calm space for healing");
  const supporting =
    subtitle ??
    (isContact
      ? "Get a feel for the space before you visit."
      : "Light-filled rooms, quiet corners and greenery at every turn — a clinic designed so that calm begins the moment you arrive.");

  if (isContact) {
    return (
      <div
        className={cn("rounded-[1.8rem] border border-border bg-card p-6 shadow-soft", className)}
      >
        <h3 className="flex items-center gap-2 font-display text-xl">
          <Camera className="size-5 text-brand" aria-hidden /> {heading}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{supporting}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {CONTACT_ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <ClinicPhoto item={item} compact />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Inside the clinic"
      className={cn("border-t border-border bg-cream/60", className)}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow="Our space" title={heading} description={supporting} />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[12rem] lg:grid-cols-3 xl:auto-rows-[13.5rem]">
          {GALLERY.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className={cn(
                "h-full",
                i === 0 && "col-span-2 lg:row-span-2",
                i === GALLERY.length - 1 && "col-span-2 lg:col-span-1",
              )}
            >
              <ClinicPhoto item={item} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
