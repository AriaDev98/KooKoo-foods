import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { HighlightHeading } from "../ui/HighlightHeading";
import { Photo } from "../ui/Photo";
import { LivingBackground } from "../ui/LivingBackground";

export function Hero({
  headline,
  tone = "light",
  imageSrc,
  imageLabel,
  height = "560px",
  showScrollCue = false,
  animateHeadline = false,
  living = false,
  className = "",
  children,
}: {
  headline: string;
  tone?: "light" | "dark";
  imageSrc?: string;
  imageLabel?: string;
  height?: string;
  showScrollCue?: boolean;
  animateHeadline?: boolean;
  living?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden grid ${className}`} style={{ minHeight: height }}>
      {imageSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Hero is always above the fold wherever it's used, so its photo
              is always the page's LCP candidate — load it eagerly, never
              lazily like every other Photo on the site. */}
          <Photo src={imageSrc} alt={imageLabel ?? ""} ratio="auto" className="min-h-full" priority />
          {/* A flat scrim, not a gradient: the headline can land anywhere
              over this image depending on content length/viewport, so
              contrast needs to hold everywhere, not just at fixed edges.
              Matches the shadow colour HighlightHeading's dark tone
              already uses, so the two read as one consistent treatment. */}
          <div className="absolute inset-0 bg-[rgba(19,31,10,0.5)]" aria-hidden="true" />
        </div>
      ) : null}
      {living ? <LivingBackground /> : null}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center gap-8 mx-auto w-full max-w-[1180px] px-10 ${showScrollCue ? "pt-2 pb-16" : "py-20"}`}
      >
        <HighlightHeading tone={tone} align="center" animateIn={animateHeadline}>
          {headline}
        </HighlightHeading>
        {children}
      </div>
      {showScrollCue ? (
        <button
          type="button"
          aria-label="Scroll down"
          onClick={(e) => {
            const section = e.currentTarget.closest("section");
            const bottom = section ? section.getBoundingClientRect().bottom + window.scrollY : window.innerHeight;
            window.scrollTo({ top: bottom - 100, behavior: "smooth" });
          }}
          className="scroll-cue absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-cream-100 opacity-85 transition-opacity duration-150 ease-standard hover:opacity-100"
        >
          <ChevronDown size={32} strokeWidth={2} />
        </button>
      ) : null}
    </section>
  );
}
