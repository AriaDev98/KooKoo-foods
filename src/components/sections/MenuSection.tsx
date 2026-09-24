import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { AddToTable } from "../ui/AddToTable";
import { DISHES, FILTERS, arrangeWholePhotos, matchesFilter, type Dish } from "../../data/dishes";

type IndicatorRect = { top: number; left: number; width: number; height: number };

function PhotoDishCard({ dish, delay }: { dish: Dish & Required<Pick<Dish, "photo">>; delay: number }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  
  return (
    <Reveal delay={delay} className="relative min-w-0">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={open}
        aria-label={
          open
            ? `${dish.name} — showing ingredients, activate to turn back`
            : `${dish.name} — activate to see ingredients and allergens`
        }
        title="Click to see ingredients and allergens"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="flip-card h-full w-full min-w-0 cursor-pointer transition-transform duration-200 ease-standard hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
        style={{ perspective: "1400px", aspectRatio: dish.photo.whole && !open ? "1080 / 668" : "3 / 4" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-standard"
          style={{ transformStyle: "preserve-3d", transform: open ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* front */}
          <div
            className={`absolute inset-0 ${dish.photo.whole ? "flex items-center" : "overflow-hidden rounded-3xl"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className={`relative w-full ${dish.photo.whole ? "overflow-hidden rounded-3xl" : "h-full"}`}>
              {dish.photo.whole ? (
                <img src={dish.photo.src} alt={dish.name} loading="lazy" className="block w-full h-auto" />
              ) : (
                <Photo src={dish.photo.src} alt={dish.name} ratio="3 / 4" />
              )}
              <div className="absolute left-0 bottom-0 flex flex-col items-start gap-[2px] p-4">
                <span className="flip-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M3 21v-5h5" />
                  </svg>
                  <span className="flip-chip-txt">
                    <span className="flip-chip-t1">Turn me over</span>
                    <span className="flip-chip-t2">Ingredients &amp; allergens</span>
                  </span>
                </span>
                <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800 bg-[rgba(243,239,228,0.9)] shadow-block px-3 py-2">
                  {dish.name}
                </h3>
              </div>
            </div>
          </div>
          {/* back */}
          <div
            className="absolute inset-0 rounded-3xl bg-green-800 p-6 flex flex-col gap-3 overflow-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div>
              <span className="font-marker text-eyebrow tracking-eyebrow uppercase text-amber-500">
                {dish.course}
              </span>
              <h3 className="m-0 mt-1 font-display text-h4 font-extrabold tracking-heading leading-snug text-cream-100">
                {dish.name}
              </h3>
              <p className="mt-2 font-body text-body-sm leading-relaxed text-cream-200">{dish.desc}</p>
            </div>
            {dish.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {dish.tags.map((tag) => (
                  <Badge key={tag.label} tone={tag.tone}>
                    {tag.label}
                  </Badge>
                ))}
              </div>
            ) : null}
            <div className="pt-3 border-t border-[rgba(240,235,220,0.24)]">
              <div className="font-ui text-caption font-bold uppercase tracking-eyebrow text-amber-500 mb-1">
                Ingredients
              </div>
              <p className="m-0 font-body text-body-sm leading-normal text-cream-200">
                {dish.photo.ingredients}
              </p>
            </div>
            <div>
              <div className="font-ui text-caption font-bold uppercase tracking-eyebrow text-amber-500 mb-1">
                Allergens
              </div>
              <p className="m-0 font-body text-body-sm leading-normal text-sage-300">
                {dish.photo.allergens}
              </p>
            </div>
            <span className="mt-auto pt-2 font-ui text-caption font-bold uppercase tracking-eyebrow text-sage-300">
              Turn back
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-3 z-10">
        <AddToTable name={dish.name} collapsed />
      </div>
    </Reveal>
  );
}

function TextDishCard({ dish, tone }: { dish: Dish; tone: "cream" | "sage" }) {
  return (
    <Card tone={tone} bordered>
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading text-green-800">
            {dish.name}
          </h3>
          <span className="font-marker text-eyebrow tracking-eyebrow uppercase text-amber-600 whitespace-nowrap">
            {dish.course}
          </span>
        </div>
        <p className="m-0 font-body text-body-md leading-relaxed text-green-700">{dish.desc}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <Badge key={tag.label} tone={tag.tone}>
                {tag.label}
              </Badge>
            ))}
          </div>
          <AddToTable name={dish.name} />
        </div>
      </div>
    </Card>
  );
}

export function MenuSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [gfOnly, setGfOnly] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const filterRefs = useRef<Partial<Record<(typeof FILTERS)[number], HTMLButtonElement>>>({});
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  const dishes = useMemo(
    () => arrangeWholePhotos(DISHES.filter((d) => matchesFilter(d, filter, gfOnly))),
    [filter, gfOnly],
  );

  useLayoutEffect(() => {
    const positionIndicator = () => {
      const track = trackRef.current;
      const btn = filterRefs.current[filter];
      if (!track || !btn) return;
      const trackRect = track.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        top: btnRect.top - trackRect.top,
        left: btnRect.left - trackRect.left,
        width: btnRect.width,
        height: btnRect.height,
      });
    };
    positionIndicator();
    window.addEventListener("resize", positionIndicator);
    return () => window.removeEventListener("resize", positionIndicator);
    // dish counts (and so button widths) change with gfOnly even when filter doesn't
  }, [filter, gfOnly]);

  return (
    <section id="menu" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading icon="chef-hat" tone="amber">
              The menu
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              Everything we cook, in one place
            </h2>
          </Reveal>
          <p className="m-0 font-body text-body-md text-green-500 max-w-[30em]">
            Vegetarian (Veg) · Vegan (V) · Gluten Free (GF) · Dairy Free (DF) · Contains Nuts (CN)
          </p>
        </div>

        <div ref={trackRef} className="relative flex flex-wrap gap-3 mt-10 mb-4">
          {indicator ? (
            <div
              aria-hidden="true"
              className="absolute rounded-full bg-green-800"
              style={{
                top: indicator.top,
                left: indicator.left,
                width: indicator.width,
                height: indicator.height,
                transition: "top 250ms var(--ease-standard), left 250ms var(--ease-standard), width 250ms var(--ease-standard), height 250ms var(--ease-standard)",
              }}
            />
          ) : null}
          {FILTERS.map((label) => {
            const active = label === filter;
            const count = DISHES.filter((d) => matchesFilter(d, label, gfOnly)).length;
            return (
              <button
                key={label}
                ref={(el) => {
                  if (el) filterRefs.current[label] = el;
                }}
                type="button"
                onClick={() => setFilter(label)}
                aria-pressed={active}
                className={`relative z-10 font-ui text-body-sm font-extrabold uppercase tracking-wide cursor-pointer px-5 py-[10px] rounded-full border-2 border-green-800 transition-colors duration-150 ease-standard hover:bg-amber-500 hover:border-amber-500 hover:text-green-800 ${
                  active ? "text-cream-200" : "bg-transparent text-green-800"
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
          {dishes.map((dish, i) =>
            dish.photo ? (
              <PhotoDishCard key={dish.name} dish={dish as Dish & Required<Pick<Dish, "photo">>} delay={(i % 3) * 90} />
            ) : (
              <TextDishCard key={dish.name} dish={dish} tone={i % 3 === 1 ? "sage" : "cream"} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
