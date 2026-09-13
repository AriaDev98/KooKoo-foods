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
  kenBurns = false,
  showScrollCue = false,
  children,
}: {
  headline: string;
  tone?: "light" | "dark";
  imageSrc: string;
  imageLabel: string;
  height?: string;
  kenBurns?: boolean;
  showScrollCue?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate grid" style={{ minHeight: height }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Photo
          src={imageSrc}
          alt={imageLabel}
          ratio="auto"
          className={`min-h-full ${kenBurns ? "kenburns" : ""}`}
        />
      </div>
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center gap-8 mx-auto w-full max-w-[1180px] px-10 ${showScrollCue ? "pt-12 pb-12" : "py-20"}`}
      >
        <HighlightHeading tone={tone} align="center">
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
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))" }}
        >
          <ChevronDown size={32} strokeWidth={2} />
        </button>
      ) : null}
    </section>
  );
}
