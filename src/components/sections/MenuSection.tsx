import { useMemo, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { DISHES, FILTERS, matchesFilter } from "../../data/dishes";

export function MenuSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [gfOnly, setGfOnly] = useState(false);

  const dishes = useMemo(
    () => DISHES.filter((d) => matchesFilter(d, filter, gfOnly)),
    [filter, gfOnly],
  );

  return (
    <section id="menu" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionHeading icon="chef-hat" tone="amber">
              The menu
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              Everything we cook, in one place
            </h2>
          </div>
          <p className="m-0 font-body text-body-md text-green-500 max-w-[30em]">
            Menu 15.07.6 — dishes rotate with the season. Veg vegetarian, V vegan, GF gluten free, DF
            dairy free, CN contains nuts.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-10 mb-4">
          {FILTERS.map((label) => {
            const active = label === filter;
            const count = DISHES.filter((d) => matchesFilter(d, label, gfOnly)).length;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(label)}
                aria-pressed={active}
                className={`font-ui text-body-sm font-extrabold uppercase tracking-wide cursor-pointer px-5 py-[10px] rounded-full border-2 border-green-800 transition-colors duration-150 ease-standard hover:bg-amber-500 hover:border-amber-500 hover:text-green-800 ${
                  active ? "bg-green-800 text-cream-200" : "bg-transparent text-green-800"
                }`}
              >
                {label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setGfOnly((v) => !v)}
            aria-pressed={gfOnly}
            className={`font-ui text-body-sm font-extrabold uppercase tracking-wide cursor-pointer ml-4 px-5 py-[10px] rounded-full border-2 border-green-800 transition-colors duration-150 ease-standard hover:bg-amber-400 hover:border-solid ${
              gfOnly ? "bg-amber-500 text-green-800 border-solid" : "bg-transparent text-green-800 border-dashed"
            }`}
          >
            {gfOnly ? "Gluten free only ✓" : "Gluten free only"}
          </button>
        </div>
        <p className="m-0 mb-10 font-body text-body-sm text-green-500">
          {dishes.length} {dishes.length === 1 ? "dish" : "dishes"}
          {filter === "All" ? " on the current menu" : ` under ${filter.toLowerCase()}`}
          {gfOnly ? ", gluten free." : "."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, i) => (
            <Card key={dish.name} tone={i % 3 === 1 ? "sage" : "cream"} bordered>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading text-green-800">
                    {dish.name}
                  </h3>
                  <span className="font-marker text-eyebrow tracking-eyebrow uppercase text-amber-600 whitespace-nowrap">
                    {dish.course}
                  </span>
                </div>
                <p className="m-0 font-body text-body-md leading-relaxed text-green-700">{dish.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {dish.tags.map((tag) => (
                    <Badge key={tag.label} tone={tag.tone}>
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
