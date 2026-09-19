import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { HighlightHeading } from "../ui/HighlightHeading";
import { Photo } from "../ui/Photo";

export function Hero({
  headline,
  tone = "light",
  imageSrc,
  imageLabel,
  height = "560px",
  showScrollCue = false,
  animateHeadline = false,
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
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`relative isolate grid ${className}`} style={{ minHeight: height }}>
      {imageSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Photo src={imageSrc} alt={imageLabel ?? ""} ratio="auto" className="min-h-full" />
        </div>
      ) : null}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center gap-8 mx-auto w-full max-w-[1180px] px-10 ${showScrollCue ? "pt-2 pb-16" : "py-20"}`}
      >
        <HighlightHeading tone={tone} align="center" animateIn={animateHeadline}>
          {headline}
        </HighlightHeading>
        {animateHeadline ? <div className="hero-content-rise">{children}</div> : children}
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
