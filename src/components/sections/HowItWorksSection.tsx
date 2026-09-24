import { CalendarDays, ClipboardList, Flame } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { HighlightHeading } from "../ui/HighlightHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { LivingBackground } from "../ui/LivingBackground";
import { useReveal } from "../../hooks/useReveal";
import { STEPS, SITE } from "../../data/content";

const STEP_ICONS = [CalendarDays, ClipboardList, Flame];

export function HowItWorksSection() {
  // Plays once, the first time the steps scroll into view; reduced-motion visitors
  // get the finished layout straight away (useReveal starts revealed for them).
  const { ref, revealed } = useReveal<HTMLDivElement>("0px 0px -120px 0px");

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

        <div
          ref={ref}
          className={`hiw-steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 ${revealed ? "is-in" : ""}`}
        >
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={step.n} className="hiw-step relative flex flex-col" style={{ "--i": i } as React.CSSProperties}>
                <div className="hiw-icon">
                  <Icon size={30} strokeWidth={2.2} aria-hidden="true" />
                  {i === STEPS.length - 1 ? (
                    <>
                      <span className="hiw-steam" />
                      <span className="hiw-steam hiw-steam-2" />
                      <span className="hiw-steam hiw-steam-3" />
                    </>
                  ) : null}
                </div>
                {i < STEPS.length - 1 ? <span className="hiw-connector" aria-hidden="true" /> : null}
                <span className="mt-5 font-marker text-h4 leading-none text-amber-500">{step.n}</span>
                <h3 className="m-0 mt-2 font-display text-h3 font-extrabold tracking-heading leading-snug text-cream-100">
                  {step.title}
                </h3>
                <p className="m-0 mt-3 font-body text-body-lg leading-relaxed text-cream-200">{step.desc}</p>
                {"link" in step && step.link ? (
                  <a
                    href={step.link.href}
                    className="mt-4 self-start border-b-2 border-amber-500 pb-[2px] font-ui text-body-sm font-extrabold uppercase tracking-wide text-amber-400 no-underline transition-colors duration-150 hover:border-cream-100 hover:text-cream-100"
                  >
                    {step.link.label} →
                  </a>
                ) : null}
              </div>
            );
          })}
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
