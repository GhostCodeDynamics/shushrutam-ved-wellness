import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { clinic, faqs } from "@/data/clinic";

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

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Reveal>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-2 shadow-soft transition-colors data-[state=open]:border-brand/30 data-[state=open]:bg-white md:px-3"
              >
                <AccordionTrigger className="group gap-4 px-4 py-5 text-left font-display text-[1.05rem] leading-snug font-normal hover:no-underline md:text-lg [&>svg]:hidden">
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 font-sans text-xs font-bold text-brand/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand group-data-[state=open]:bg-brand group-data-[state=open]:text-cream">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 md:px-12">
                  <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mt-12">
          <div className="texture-grain relative overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-10 text-center text-cream">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-brand-soft/30 blur-3xl"
            />
            <h2 className="relative font-display text-2xl md:text-[1.8rem]">
              Still have a question?
            </h2>
            <p className="relative mx-auto mt-2 max-w-md text-sm text-cream/80">
              Send us a message and we'll reply personally within one working day.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gold" size="pill" className="btn-arrow">
                <Link to="/contact">
                  Contact the clinic <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="pill"
                variant="outline"
                className="border-cream/35 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
