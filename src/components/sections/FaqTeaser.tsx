import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { FAQ } from "../../data/faq";

const PREVIEW_COUNT = 4;

export function FaqTeaser() {
  return (
    <section className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <SectionHeading icon="circle-help" tone="sage">
            Questions
          </SectionHeading>
          <h2 className="mt-6 mb-10 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {FAQ.slice(0, PREVIEW_COUNT).map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <div className="border-b border-cream-400 py-5">
                <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                  {item.question}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Button variant="outline" size="md" href="/faq" className="mt-8">
          See all questions
        </Button>
      </div>
    </section>
  );
}
