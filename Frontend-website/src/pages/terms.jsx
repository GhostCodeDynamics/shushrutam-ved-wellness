import { ArrowRight, FileCheck2, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { clinic } from "@/data/clinic";

const notice = {
  icon: ShieldAlert,
  title: "Legal review required",
  body: "These terms are a professional starting template for review. They must be confirmed or amended by the client and, where needed, a qualified legal counsel before public launch.",
};

const sections = [
  {
    title: "Use of this website",
    body: "This website is provided to inform visitors about the holistic and lifestyle-medicine services offered by the clinic — including Ayurveda, naturopathy, nutrition and yoga-based programmes — and to enable appointment enquiries. You may browse openly, but you are responsible for the accuracy of the information you submit through appointment or enquiry forms.",
  },
  {
    title: "Information you share",
    body: "When you submit an appointment or contact enquiry you agree to provide accurate, current information about yourself (and, where applicable, the person you are enquiring on behalf of). The clinic uses this information solely to respond to and prepare for your consultation, as described in our Privacy Policy.",
  },
  {
    title: "Not a substitute for advice",
    body: "Content on this website — including the wellness journal — is educational and general in nature. It is not individual medical advice, diagnosis, or treatment. Decisions about your health should be made with your treating physician or qualified practitioner.",
  },
  {
    title: "Scheduling",
    body: "Submitting an appointment enquiry requests a slot; it is not a guarantee until the clinic confirms it (by phone, WhatsApp or in writing). The clinic may confirm, reschedule or decline a request based on availability and clinical need.",
  },
  {
    title: "Fees and payments",
    body: "Fees for consultations and programmes are as told to you at booking or during consultation. Any payment information or invoicing arrangements will be shared directly with you at that time.",
  },
  {
    title: "Your conduct",
    body: "You agree not to misuse this website — for example, attempting to access admin or private systems, submitting offensive or knowingly false information, or interfering with its normal operation.",
  },
  {
    title: "Intellectual property",
    body: "The name, logo, text, images and design of this site belong to the clinic (and, where applicable, its developers). You may not reproduce or redistribute them for commercial purposes without written permission.",
  },
  {
    title: "Liability",
    body: "The clinic works to keep the site accurate and available but does not guarantee it will be error-free or uninterrupted. Nothing in these terms excludes liability that cannot lawfully be excluded. General wellness information is provided without a warranty that it is suitable for your particular situation.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. The date at the top of this page shows when they were last reviewed. Continued use of the site after an update indicates acceptance of the updated terms.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of India, and both you and the clinic submit to the jurisdiction of the courts at Bhopal, Madhya Pradesh.",
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | ShushrutamVed Care"
        description="Terms of use for the ShushrutamVed Care website — scope of services, appointment enquiries, intellectual property and liability."
        path="/terms"
      />

      <PageHero
        eyebrow="Terms of Service"
        title="How you may use this website"
        description="Simple, fair terms covering browsing, enquiries, appointments and content. Please read them before using the site."
      />

      <section className="bg-cream/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="flex items-start gap-4 rounded-[1.6rem] border border-gold/40 bg-gold-soft/60 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <notice.icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg">{notice.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notice.body}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 40}>
                <div className="flex gap-5">
                  <span className="pt-0.5 font-display text-sm text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-xl">{s.title}</h2>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="flex gap-5 border-t border-border pt-8">
                <span className="pt-0.5 font-display text-sm text-muted-foreground/50">11</span>
                <div>
                  <h2 className="font-display text-xl">Contact</h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    Questions about these terms are welcome at{" "}
                    <a
                      href={`mailto:${clinic.email}`}
                      className="font-semibold text-brand hover:underline underline-offset-4"
                    >
                      {clinic.email}
                    </a>{" "}
                    or {clinic.phone}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-brand/15 bg-brand-tint/60 p-6">
            <p className="flex items-center gap-3 font-display text-lg">
              <FileCheck2 className="size-5 text-brand" aria-hidden /> Last reviewed
              <span className="text-sm font-sans font-semibold text-muted-foreground">
                20 September 2026
              </span>
            </p>
            <Button asChild variant="hero" size="pillSm" className="btn-arrow">
              <Link to="/contact">
                Ask us <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
