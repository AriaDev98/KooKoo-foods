import { SectionHeading } from "../ui/SectionHeading";
import { OCCASIONS } from "../../data/content";

export function OccasionsSection() {
  return (
    <section className="bg-sage-300 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <SectionHeading icon="users" tone="clay">
          What we cook for
        </SectionHeading>
        <div className="flex flex-wrap gap-4 mt-10">
          {OCCASIONS.map((occasion) => (
            <span
              key={occasion}
              className="font-display text-h4 font-extrabold tracking-heading text-green-800 bg-cream-200 px-8 py-4 border-b-4 border-amber-500"
            >
              {occasion}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
