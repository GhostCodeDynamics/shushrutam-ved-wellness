import { Heart, Info, ShieldAlert } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Reveal } from "@/components/site/Reveal";
import { clinic } from "@/data/clinic";

const sections = [
  {
    title: "Educational information only",
    body: "All content published on this website — including articles in the wellness journal, condition overviews, service descriptions and FAQ answers — is provided for general educational purposes. It is not designed to diagnose, treat, cure or prevent any disease, and it is not individual medical advice.",
  },
  {
    title: "Not a substitute for medical care",
    body: "The holistic and lifestyle medicine services offered by ShushrutamVed Care — including Ayurveda, naturopathy, nutrition, yoga therapy, Panchakarma, Reiki and oncology nutrition support — are complementary approaches. They work alongside, and never instead of, the care provided by your physician, endocrinologist, cardiologist, psychiatrist, oncologist or other qualified specialist. Please do not stop, start or change any medication without consulting your treating doctor.",
  },
  {
    title: "Individual results vary",
    body: "Wellness journeys are personal. Outcomes depend on your condition, history, adherence and many other factors. Reading about a protocol on this site does not mean it is suitable for you — a personalised plan can only be prepared after a proper consultation.",
  },
  {
    title: "Emergency situations",
    body: "This website is not monitored for emergencies and does not offer urgent care. If you are experiencing a medical emergency or severe symptoms, contact your local emergency services or go to the nearest hospital immediately.",
  },
  {
    title: "Third-party content",
    body: "The site may link to external resources (such as maps or health organisations). We are not responsible for the accuracy or policies of third-party websites, and following a link does not imply endorsement.",
  },
];

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Medical Disclaimer | ShushrutamVed Care"
        description="ShushrutamVed Care's medical disclaimer — our website provides educational wellness information and is not a substitute for personal medical advice or emergency care."
        path="/disclaimer"
      />

      <PageHero
        eyebrow="Medical Disclaimer"
        title="Important: read this first"
        description="Transparency about the limits of online wellness information — and clear guidance on when to seek medical care directly."
      />

      <section className="bg-cream/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="flex items-start gap-4 rounded-[1.6rem] border border-brand/15 bg-brand-tint/60 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <ShieldAlert className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg">Read before relying on any article</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Everything on this site is general education. It can never replace the judgement
                  of a qualified practitioner who knows your full history.
                </p>
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
                <span className="pt-0.5 font-display text-sm text-muted-foreground/50">06</span>
                <div>
                  <h2 className="flex items-center gap-2 font-display text-xl">
                    <Heart className="size-5 text-brand" aria-hidden /> Responsible use
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    We share this guidance freely because education is the first step of healing —
                    and we expect it to be used responsibly. If something you read here raises
                    questions about your condition, bring it to your consultation or discuss it with{" "}
                    {clinic.doctor} and your treating physician.
                  </p>
                  <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    Last reviewed: 20 September 2026.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
