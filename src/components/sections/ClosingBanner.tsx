import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SITE } from "../../data/content";

export function ClosingBanner() {
  return (
    <section className="bg-green-800 text-cream-200 px-6 sm:px-10 py-24 text-center">
      <div className="max-w-[760px] mx-auto flex flex-col items-center gap-8">
        <Reveal>
          <h2 className="m-0 font-display text-h2 font-extrabold tracking-heading leading-snug">
            Tell us what you're planning
          </h2>
        </Reveal>
        <p className="m-0 font-body text-lead leading-relaxed text-sage-200 max-w-[32em]">
          Send the date, the number of guests and any dietary needs. We reply with a spread and a
          price, usually the same day.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" href="/contact" premium>
            Send my enquiry
          </Button>
          <Button variant="outlineInverse" size="lg" href={SITE.phoneHref}>
            Call {SITE.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
