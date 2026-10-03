import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { OCCASION_PAGES, OTHER_OCCASIONS } from "../../data/occasions";

export function WhosComingSection() {
  return (
    <section className="bg-cream-200 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <SectionHeading icon="users" tone="clay">
            Who's coming?
          </SectionHeading>
          <h2 className="mt-6 mb-10 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
            Catering for every occasion
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {OCCASION_PAGES.map((occasion, i) => (
            <Reveal key={occasion.slug} delay={i * 90}>
              <a
                href={occasion.href}
                className="group block overflow-hidden rounded-3xl bg-cream-100 shadow-card no-underline transition-transform duration-200 ease-standard hover:-translate-y-1"
              >
                <Photo src={occasion.cardPhoto} alt={occasion.cardLabel} ratio="4 / 3" />
                <div className="p-6">
                  <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                    {occasion.cardLabel}
                  </h3>
                  <span className="mt-2 inline-block font-ui text-body-sm font-bold text-amber-600 group-hover:text-amber-500">
                    See the spread &rarr;
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {OTHER_OCCASIONS.map((occasion) => (
            <a
              key={occasion}
              href={`/contact?occasion=${encodeURIComponent(occasion)}`}
              className="font-ui text-body-sm font-bold text-green-800 bg-sage-200 hover:bg-sage-300 px-5 py-3 rounded-full no-underline transition-colors duration-150 ease-standard"
            >
              {occasion}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
