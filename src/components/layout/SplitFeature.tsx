import type { ReactNode } from "react";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

type Surface = "cream" | "sage" | "green" | "raised";

const surfaces: Record<Surface, string> = {
  cream: "bg-cream-200 text-green-700",
  sage: "bg-sage-300 text-green-800",
  green: "bg-green-800 text-cream-200",
  raised: "bg-cream-100 text-green-700",
};

export function SplitFeature({
  children,
  imageSrc,
  imageLabel,
  imageSide = "right",
  surface = "sage",
  softCorner = true,
  minHeight = "520px",
  revealImage = false,
}: {
  children: ReactNode;
  imageSrc: string;
  imageLabel: string;
  imageSide?: "left" | "right";
  surface?: Surface;
  softCorner?: boolean;
  minHeight?: string;
  revealImage?: boolean;
}) {
  const panel = (
    <div
      className={`flex flex-col justify-center gap-6 px-16 py-20 ${surfaces[surface]}`}
      style={{
        borderRadius: softCorner
          ? imageSide === "right"
            ? "0 0 32px 0"
            : "0 0 0 32px"
          : 0,
      }}
    >
      <div className="max-w-[34ch]">{children}</div>
    </div>
  );

  const photo = <Photo src={imageSrc} alt={imageLabel} ratio="auto" className="min-h-full" />;
  const media = revealImage ? <Reveal>{photo}</Reveal> : photo;

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 items-stretch"
      style={{ minHeight }}
    >
      {imageSide === "right" ? (
        <>
          {panel}
          {media}
        </>
      ) : (
        <>
          {media}
          {panel}
        </>
      )}
    </section>
  );
}
