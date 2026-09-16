import { Helmet } from "react-helmet-async";

import { PageHero } from "@/components/site/PageHero";
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

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
          <Reveal>
            <h2 className="font-display text-xl font-semibold">Contact</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              For any privacy-related question, write to{" "}
              <a
                href={`mailto:${clinic.email}`}
                className="text-brand underline-offset-4 hover:underline"
              >
                {clinic.email}
              </a>{" "}
              or call {clinic.phone}.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
