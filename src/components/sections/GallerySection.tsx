import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { SocialLinks } from "../ui/SocialLinks";
import { GALLERY, type GalleryItem } from "../../data/gallery";

function GalleryCard({ item, delay = 0 }: { item: GalleryItem; delay?: number }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <Reveal delay={delay}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={open}
        aria-label={
          open
            ? `${item.label} — showing ingredients, activate to turn back`
            : `${item.label} — activate to see ingredients and allergens`
        }
        title="Click to see ingredients and allergens"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="cursor-pointer transition-transform duration-200 ease-standard hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
        style={{ perspective: "1400px", aspectRatio: "3 / 4", minHeight: 380 }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-standard"
          style={{ transformStyle: "preserve-3d", transform: open ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* front */}
          <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
            <Photo src={item.src} alt={item.label} ratio="3 / 4" />
            <div className="absolute left-0 bottom-0 flex flex-col items-start gap-[2px] p-4">
              <span className="font-ui text-eyebrow font-bold uppercase tracking-eyebrow text-green-800 bg-amber-500 px-[10px] py-[5px]">
                Turn me over
              </span>
              <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800 bg-[rgba(243,239,228,0.9)] shadow-block px-3 py-2">
                {item.label}
              </h3>
            </div>
          </div>
          {/* back */}
          <div
            className="absolute inset-0 bg-green-800 p-6 flex flex-col gap-4 overflow-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div>
              <div className="font-ui text-caption font-bold uppercase tracking-eyebrow text-amber-500 mb-1">
                Ingredients
              </div>
              <p className="m-0 font-body text-body-sm leading-normal text-cream-200">
                {item.ingredients}
              </p>
            </div>
            <div className="pt-3 border-t border-[rgba(240,235,220,0.24)]">
              <div className="font-ui text-caption font-bold uppercase tracking-eyebrow text-amber-500 mb-1">
                Allergens
              </div>
              <p className="m-0 font-body text-body-sm leading-normal text-sage-300">
                {item.allergens}
              </p>
            </div>
            <span className="mt-auto pt-2 font-ui text-caption font-bold uppercase tracking-eyebrow text-sage-300">
              Turn back
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="bg-cream-200 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading icon="camera" tone="amber">
            From the kitchen
          </SectionHeading>
          <div className="flex flex-wrap items-center gap-4 max-w-[34em]">
            <p className="m-0 font-body text-body-md text-green-500">
              Click a photo to turn it over for the ingredients. Lists are a guide — tell us about
              allergies or intolerances and we confirm every dish before we cook. Follow us for more:
            </p>
            <SocialLinks tone="onLight" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {GALLERY.map((item, i) => (
            <GalleryCard key={item.label} item={item} delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
