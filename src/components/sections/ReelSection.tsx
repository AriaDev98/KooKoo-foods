import { useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa6";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { SITE } from "../../data/content";

// Only plays while the card is actually on screen, so the clip never
// downloads or runs for visitors who scroll straight past it.
function useAutoplayInView<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

export function ReelSection() {
  const videoRef = useAutoplayInView<HTMLVideoElement>();

  return (
    <section className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal className="flex flex-col justify-center">
          <SectionHeading icon="camera" tone="clay">
            From our kitchen to the street
          </SectionHeading>
          <h2 className="mt-6 mb-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
            Find us at local markets
          </h2>
          <p className="m-0 mb-8 font-body text-body-lg leading-relaxed text-green-700 max-w-[34em]">
            Before enquiries and events, there was a market stall — the same food, cooked the same
            way, just out in the open.
          </p>
          <Button href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" variant="outline" className="self-start">
            <FaInstagram size={18} aria-hidden="true" />
            See more on {SITE.instagramHandle}
          </Button>
        </Reveal>
        <Reveal delay={120} className="flex justify-center md:justify-end">
          <div
            className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-[0_20px_50px_-16px_rgba(31,51,16,0.5)]"
            style={{ aspectRatio: "9 / 16" }}
          >
            <video
              ref={videoRef}
              src="/videos/kitchen-to-street.mp4"
              poster="/images/photos/kitchen-to-street-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Kookoo Foods, from the FoodLab kitchen to the market stall"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
