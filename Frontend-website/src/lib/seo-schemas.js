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
    { days: ["sunday"], opens: "00:00", closes: "23:59" },
  ];

  return ranges.map((r) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: r.days.map((d) => `https://schema.org/${d.charAt(0).toUpperCase()}${d.slice(1)}day`),
    opens: r.opens,
    closes: r.closes,
  }));
}

export function clinicSchema(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician"],
    "@id": absoluteUrl(path),
    name: clinic.name,
    description: `${clinic.name} — ${clinic.tagline}.`,
    url: absoluteUrl(path),
    telephone: clinic.phone,
    email: clinic.email,
    image: absoluteUrl("/og-image.png"),
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B/86 OM Nagar, Kolar Road",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462042",
      addressCountry: "IN",
    },
    openingHoursSpecification: openingHoursSpecification(),
    medicalSpecialty: "https://schema.org/Preventive",
    founder: {
      "@type": "Physician",
      name: clinic.doctor,
      jobTitle: "Holistic & Integrative Wellness Practitioner",
      medicalSpecialty: "https://schema.org/Preventive",
    },
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

export function articleSchema({ title, excerpt, slug, image, publishedTime, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
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

export function breadcrumbSchema(items) {
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
      "@type": "ItemList",
      position: i + 1,
      item: {
        "@type": ["Service", "MedicalBusiness"],
        name: service.title,
        description: service.description,
        provider: {
          "@type": "MedicalClinic",
          name: clinic.name,
          url: absoluteUrl("/"),
        },
      },
    })),
  };
}
