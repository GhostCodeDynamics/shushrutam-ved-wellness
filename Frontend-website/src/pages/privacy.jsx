import { Mail, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/Premium";
import { Reveal } from "@/components/site/Reveal";
import { clinic } from "@/data/clinic";

const sections = [
  {
    title: "Information we collect",
    body: "We collect the details you choose to share — name, phone number, email, preferred appointment time and a description of your health concern. During consultations we may record clinical history, reports and progress notes.",
  },
  {
    title: "How we use your information",
    body: "Your information is used only to confirm appointments, prepare your consultation, create your personalised plan and follow up on your progress. We do not sell or rent personal data to anyone.",
  },
  {
    title: "Confidentiality",
    body: "Health information is treated as strictly confidential and is accessible only to the treating practitioner and authorised clinic staff. Records are shared with a third party only with your explicit consent, or where required by law.",
  },
  {
    title: "Communication",
    body: "We may contact you by phone, WhatsApp or email regarding your appointment, plan or follow-up. You may opt out of non-essential communication at any time by telling us.",
  },
  {
    title: "Data retention",
    body: "Clinical records are retained for the period required for continuity of care and applicable regulations, after which they are securely disposed of.",
  },
  {
    title: "Your rights",
    body: "You may request access to your records, ask for corrections, or ask us to delete information that we are not legally required to keep.",
  },
];

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ShushrutamVed Care</title>
        <meta
          name="description"
          content="How ShushrutamVed Care collects, uses, stores and protects patient information shared through consultations and website enquiries."
        />
        <meta property="og:title" content="Privacy Policy | ShushrutamVed Care" />
        <meta
          property="og:description"
          content="Our commitment to confidentiality and responsible handling of your health data."
        />
      </Helmet>

      <PageHero
        eyebrow="Privacy Policy"
        title="Your health data, handled with care"
        description="Confidentiality is central to our practice. This page explains what we collect and how it is protected."
      />

      <section className="bg-cream/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="flex items-start gap-4 rounded-[1.6rem] border border-brand/15 bg-brand-tint/60 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg">Our commitment in one line</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Your health information is stored securely, accessed only by your treating
                  practitioner, and never sold.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
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
                <span className="pt-0.5 font-display text-sm text-muted-foreground/50">07</span>
                <div>
                  <h2 className="font-display text-xl">Contact</h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    For any privacy-related question, write to{" "}
                    <a
                      href={`mailto:${clinic.email}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline underline-offset-4"
                    >
                      <Mail className="size-4" aria-hidden /> {clinic.email}
                    </a>{" "}
                    or call {clinic.phone}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <Eyebrow center>Last reviewed</Eyebrow>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              This policy was last reviewed in 2026.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
