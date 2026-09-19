type Tone = "light" | "dark";
type Level = "hero" | "section";

const tones: Record<Tone, string> = {
  light: "bg-cream-200 text-green-800 px-[0.22em] py-[0.14em] shadow-block",
  // No block at all on the living background — a flat or translucent fill
  // both still read as a mismatched box sitting on top of a shifting scene.
  // Plain text plus a soft drop shadow keeps it legible without a visible
  // edge, closer to how text just sits in the light of the gradient.
  dark: "text-cream-100 [text-shadow:0_4px_22px_rgba(19,31,10,0.65)]",
};

const levels: Record<Level, string> = {
  hero: "text-hero tracking-hero",
  section: "text-h1 tracking-heading",
};

export function HighlightHeading({
  children,
  tone = "light",
  level = "hero",
  as = "h1",
  align = "start",
  animateIn = false,
}: {
  children: string;
  tone?: Tone;
  level?: Level;
  as?: "h1" | "h2";
  align?: "start" | "center";
  animateIn?: boolean;
}) {
  const Tag = as;
  const lines = children.split("\n");
  // stagger indices continue across line breaks so the whole headline reads as one sequence
  let wordIndex = 0;
  return (
    <Tag
      className={`m-0 flex flex-col ${
        align === "center" ? "items-center" : "items-start"
      } gap-[2px] font-display font-extrabold leading-tight ${levels[level]}`}
    >
      {lines.map((line, i) => (
        <span key={i} className={tones[tone]} style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
          {animateIn
            ? line.split(" ").map((word, wi) => {
                const delay = wordIndex * 60;
                wordIndex += 1;
                return (
                  <span key={wi} className="inline-block overflow-hidden align-top">
                    <span className="hero-word" style={{ animationDelay: `${delay}ms` }}>
                      {word}
                      {wi < line.split(" ").length - 1 ? " " : ""}
                    </span>
                  </span>
                );
              })
            : line}
        </span>
      ))}
    </Tag>
  );
}
