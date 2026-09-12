import type { ReactNode } from "react";
import { HighlightHeading } from "../ui/HighlightHeading";
import { Photo } from "../ui/Photo";

export function Hero({
  headline,
  tone = "light",
  imageSrc,
  imageLabel,
  height = "560px",
  kenBurns = false,
  children,
}: {
  headline: string;
  tone?: "light" | "dark";
  imageSrc: string;
  imageLabel: string;
  height?: string;
  kenBurns?: boolean;
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
        className="relative z-10 flex flex-col items-center justify-center text-center gap-8 mx-auto w-full max-w-[1180px] px-10 py-20"
      >
        <HighlightHeading tone={tone} align="center">
          {headline}
        </HighlightHeading>
        {children}
      </div>
    </section>
  );
}
