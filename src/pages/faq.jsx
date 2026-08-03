import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/clinic";

export default function Faq() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | ShushrutamVed Care</title>
        <meta
          name="description"
          content="Answers about naturopathy consultations, timelines, online appointments, diet plans and combining natural care with existing medication."
        />
        <meta property="og:title" content="Frequently Asked Questions | ShushrutamVed Care" />
        <meta
          property="og:description"
          content="What to expect from naturopathy and lifestyle care at ShushrutamVed Care."
        />
      </Helmet>

      <PageHero
        eyebrow="FAQ"
        title="Everything you might be wondering"
        description="Clear answers about consultations, timelines and how naturopathy works alongside conventional care."
      />

      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-border bg-card px-6 shadow-soft"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mt-14 rounded-3xl border border-border bg-brand-tint/60 p-8 text-center">
          <h2 className="font-display text-xl font-semibold">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Send us a message and we'll reply personally within one working day.
          </p>
          <Button asChild variant="hero" size="pill" className="mt-7">
            <Link to="/contact">Contact the clinic</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
