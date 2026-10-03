import { Photo } from "../components/ui/Photo";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { getDish } from "../data/dishes";
import { getPantryItem } from "../data/content";
import type { OccasionPage } from "../data/occasions";

export function OccasionPageTemplate({ page }: { page: OccasionPage }) {
  const dishes = page.dishNames.map(getDish);
  const pantryItems = (page.pantryNames ?? []).map(getPantryItem);

  return (
    <>
      <section className="bg-green-800 text-cream-200 px-6 sm:px-10 py-24 text-center">
        <div className="max-w-[760px] mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h1 className="m-0 font-display text-hero font-extrabold tracking-hero leading-tight">{page.h1}</h1>
          </Reveal>
          <p className="m-0 font-body text-lead leading-relaxed text-sage-200 max-w-[36em]">{page.intro}</p>
        </div>
      </section>

      <section className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <h2 className="m-0 mb-10 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              {page.dishesHeading}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish, i) => (
              <Reveal key={dish.name} delay={(i % 3) * 90}>
                <div className="flex flex-col gap-4">
                  {dish.photo ? <Photo src={dish.photo.src} alt={dish.name} ratio="3 / 4" /> : null}
                  <div>
                    <h3 className="m-0 mb-2 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                      {dish.name}
                    </h3>
                    <p className="m-0 font-body text-body-md leading-relaxed text-green-700">{dish.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            {pantryItems.map((item, i) => (
              <Reveal key={item.name} delay={((dishes.length + i) % 3) * 90}>
                <div className="flex flex-col gap-4">
                  <Photo src={item.src} alt={item.name} ratio="3 / 4" />
                  <div>
                    <h3 className="m-0 mb-2 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                      {item.name}
                    </h3>
                    <p className="m-0 font-body text-body-md leading-relaxed text-green-700">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-200 px-6 sm:px-10 py-24 text-center">
        <div className="max-w-[640px] mx-auto flex flex-col items-center gap-8">
          <p className="m-0 font-body text-body-lg leading-relaxed text-green-700">{page.logistics}</p>
          <Button variant="primary" size="lg" href={`/contact?occasion=${encodeURIComponent(page.occasionValue)}`} premium>
            {page.ctaLabel}
          </Button>
        </div>
      </section>
    </>
  );
}
