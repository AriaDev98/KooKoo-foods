import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { PANTRY } from "../../data/content";

export function PantryTeaser() {
  return (
    <section className="bg-cream-200 px-6 sm:px-10 py-24">
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
          <Button variant="outline" size="md" href="/menu#pantry">
            See the pantry
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {PANTRY.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <div className="flex flex-col gap-4">
                <Photo src={item.src} alt={item.name} ratio="1 / 1" />
                <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading text-green-800">
                  {item.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
