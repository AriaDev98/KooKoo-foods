import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { OCCASIONS, OCCASION_PHOTOS } from "../../data/content";

export function OccasionsSection() {
  return (
    <section className="bg-sage-300 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <SectionHeading icon="users" tone="clay">
            What we cook for
          </SectionHeading>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {OCCASIONS.map((occasion, i) => (
            <Reveal key={occasion} delay={(i % 4) * 80} className="min-w-0">
              <div className="relative overflow-hidden rounded-3xl transition-transform duration-200 ease-standard hover:-translate-y-1">
                <Photo src={OCCASION_PHOTOS[occasion]} alt={occasion} ratio="4 / 3" />
                <span className="absolute left-3 bottom-3 right-3 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800 bg-[rgba(243,239,228,0.9)] shadow-block px-3 py-2">
                  {occasion}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
