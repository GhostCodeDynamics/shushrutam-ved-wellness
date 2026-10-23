import { clinic } from "@/data/clinic";
import { absoluteUrl } from "@/lib/site";

function openingHoursSpecification() {
  const ranges = [
    {
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      opens: "09:00",
      closes: "19:00",
    },
    { days: ["saturday"], opens: "09:00", closes: "16:00" },
  ];

  return ranges.map((r) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: r.days.map((d) => `https://schema.org/${d.charAt(0).toUpperCase()}${d.slice(1)}`),
    opens: r.opens,
    closes: r.closes,
  }));
}

const CLINIC_ID = `${absoluteUrl("/")}#clinic`;

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: clinic.name,
    alternateName: `${clinic.name} — Naturopathy & Holistic Wellness Clinic, Bhopal`,
    description: `${clinic.name} is a naturopathy and holistic wellness clinic in Bhopal led by ${clinic.doctor}, offering Ayurveda, clinical nutrition, yoga therapy and Panchakarma.`,
    url: absoluteUrl("/"),
    telephone: clinic.phone,
    email: clinic.email,
    image: absoluteUrl("/og-image.png"),
    logo: absoluteUrl("/assets/logo/icon.png"),
    slogan: clinic.tagline,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B/86 OM Nagar, Kolar Road",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462042",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.latitude,
      longitude: clinic.geo.longitude,
    },
    hasMap: clinic.mapLink,
    openingHoursSpecification: openingHoursSpecification(),
    medicalSpecialty: ["DietNutrition", "PreventiveMedicine"],
    availableService: [
      { "@type": "MedicalTherapy", name: "Naturopathy" },
      { "@type": "MedicalTherapy", name: "Ayurveda" },
      { "@type": "MedicalTherapy", name: "Yoga Therapy" },
      { "@type": "MedicalTherapy", name: "Panchakarma" },
      { "@type": "MedicalTherapy", name: "Clinical Nutrition" },
    ],
    areaServed: [
      { "@type": "City", name: "Bhopal" },
      { "@type": "AdministrativeArea", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    founder: {
      "@type": "Physician",
      name: clinic.doctor,
      jobTitle: "Holistic & Integrative Wellness Practitioner",
      url: absoluteUrl("/about"),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: clinic.phone,
      email: clinic.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    // No sameAs until the clinic has verified social/Google Business Profile URLs.
  };
}

export function faqSchema(faqList) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function articleSchema({
  title,
  excerpt,
  description,
  slug,
  image,
  publishedTime,
  dateModified,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || excerpt,
    image: image ? absoluteUrl(image) : undefined,
    author: {
      "@type": "Person",
      name: clinic.doctor,
    },
    publisher: {
      "@type": "Organization",
      name: clinic.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/logo/icon.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    datePublished: publishedTime,
    dateModified: dateModified || publishedTime,
  };
}

export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: clinic.name,
    description: `${clinic.name} — ${clinic.tagline}.`,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: clinic.name,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/logo/icon.png"),
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: clinic.phone,
        contactType: "customer service",
        availableLanguage: ["en", "hi"],
      },
    },
  };
}

export function serviceListSchema(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${clinic.name} — wellness programmes`,
    url: absoluteUrl("/services"),
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": CLINIC_ID },
      },
    })),
  };
}
