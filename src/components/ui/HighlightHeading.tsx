type Tone = "light" | "dark";
type Level = "hero" | "section";

const tones: Record<Tone, string> = {
  light: "bg-cream-200 text-green-800",
  // Translucent + blurred rather than a flat fill, so the block reads as a
  // soft scrim over the living background instead of a mismatched flat
  // patch sitting on top of it (used on sections with LivingBackground).
  dark: "text-cream-200 backdrop-blur-sm bg-[rgba(27,46,15,0.55)]",
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
        <span key={i} className={`${tones[tone]} px-[0.22em] py-[0.14em] shadow-block`} style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
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
