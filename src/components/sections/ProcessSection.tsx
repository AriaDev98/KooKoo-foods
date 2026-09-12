import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { PROCESS_STEPS } from "../../data/content";

export function ProcessSection() {
  return (
    <section id="process" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div>
            <SectionHeading icon="chef-hat" tone="clay">
              Made by hand
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-tight text-green-800">
              The process of baking auchma
            </h2>
          </div>
          <p className="m-0 font-body text-lead leading-relaxed text-green-700 max-w-[32em]">
            Every auchma is rolled, brushed and sprinkled by hand at the FoodLab kitchen on the morning
            of your event — never frozen, never bought in.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {PROCESS_STEPS.map((step, i) => (
            <figure key={step.n} className="m-0 flex flex-col gap-5">
              <Reveal delay={(i % 3) * 90}>
                <Photo src={step.src} alt={step.label} ratio="3 / 4" />
              </Reveal>
              <figcaption className="flex gap-4 items-baseline">
                <span className="font-marker text-h4 leading-none text-clay-500">{step.n}</span>
                <span className="font-body text-body-lg leading-relaxed text-green-500">
                  {step.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
