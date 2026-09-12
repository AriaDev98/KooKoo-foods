import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { PANTRY } from "../../data/content";

export function PantrySection() {
  return (
    <section id="pantry" className="bg-cream-200 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading icon="leaf" tone="clay">
              Jars and pantry
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              Take something home
            </h2>
          </Reveal>
          <p className="m-0 font-body text-body-md text-green-500 max-w-[30em]">
            Made in small batches at FoodLab. Add them to a catering order, or ask what is in stock this
            week.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {PANTRY.map((item, i) => (
            <div key={item.name} className="flex flex-col gap-5">
              <Reveal delay={(i % 3) * 90}>
                <Photo src={item.src} alt={item.name} ratio="1 / 1" />
              </Reveal>
              <div>
                <h3 className="m-0 mb-3 font-display text-h4 font-extrabold tracking-heading text-green-800">
                  {item.name}
                </h3>
                <p className="m-0 font-body text-body-md leading-relaxed text-green-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
