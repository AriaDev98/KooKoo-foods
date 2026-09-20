import { SectionHeading } from "../ui/SectionHeading";
import { HighlightHeading } from "../ui/HighlightHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { LivingBackground } from "../ui/LivingBackground";
import { STEPS, SITE } from "../../data/content";

export function HowItWorksSection() {
  return (
    <section id="how" className="relative isolate overflow-hidden bg-green-800 text-cream-200 px-6 sm:px-10 py-24">
      <LivingBackground />
      <div className="relative z-10 max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <Reveal>
            <SectionHeading icon="notebook-pen" tone="amber" color="cream">
              How it works
            </SectionHeading>
            <div className="mt-6">
              <HighlightHeading tone="dark" level="section" as="h2">
                {"Three steps\nto a full table"}
              </HighlightHeading>
            </div>
          </Reveal>
          <p className="m-0 font-body text-lead leading-relaxed text-cream-200 max-w-[30em]">
            We cater from 10 guests up, and no menu is fixed. Tell us the date and we will build the
            spread around your table.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-5 pt-6 border-t-4 border-amber-500">
              <span className="font-marker text-h2 leading-none text-amber-500">{step.n}</span>
              <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-cream-100">
                {step.title}
              </h3>
              <p className="m-0 font-body text-body-lg leading-relaxed text-cream-200">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 items-center mt-16 pt-10 border-t border-[rgba(240,235,220,0.24)]">
          <Button variant="primary" size="lg" href="#enquire">
            Send an enquiry
          </Button>
          <span className="font-body text-body-lg text-cream-200">
            or call{" "}
            <a href={SITE.phoneHref} className="text-amber-500 font-semibold no-underline">
              {SITE.phone}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
