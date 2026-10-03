import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { FAQ } from "../../data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="bg-cream-200 border-t border-cream-400 px-6 sm:px-10 py-24">
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
          {FAQ.map((item, i) => (
            <Reveal key={item.question} delay={(i % 4) * 60}>
              <details className="group border-b border-cream-400 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex-none font-ui text-h4 leading-none text-amber-500 transition-transform duration-200 ease-standard group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 mt-4 max-w-[60ch] font-body text-body-md leading-relaxed text-green-700">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
