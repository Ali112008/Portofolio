"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section id="faq" className="section-padding bg-surface/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          label="FAQ"
          title="Questions, Answered"
          subtitle="Everything you need to know before starting a project. Still curious about something? Ask me directly."
        />

        <Reveal>
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-border rounded-2xl border border-border bg-surface overflow-hidden"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="px-5 sm:px-6 border-0"
              >
                <AccordionTrigger className="cursor-pointer text-left text-sm sm:text-base font-medium hover:no-underline py-5 [&[data-state=open]>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-center text-xs text-muted mt-8">
            Still have a question?{" "}
            <a
              href="#contact"
              className="text-primary hover:text-primary-light underline underline-offset-4"
            >
              Get in touch
            </a>{" "}
            — I usually reply within a few hours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
