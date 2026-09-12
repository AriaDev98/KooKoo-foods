type Tone = "light" | "dark";
type Level = "hero" | "section";

const tones: Record<Tone, string> = {
  light: "bg-cream-200 text-green-800",
  dark: "bg-green-800 text-cream-200",
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
}: {
  children: string;
  tone?: Tone;
  level?: Level;
  as?: "h1" | "h2";
  align?: "start" | "center";
}) {
  const Tag = as;
  return (
    <Tag
      className={`m-0 flex flex-col ${
        align === "center" ? "items-center" : "items-start"
      } gap-[2px] font-display font-extrabold leading-tight ${levels[level]}`}
    >
      {children.split("\n").map((line, i) => (
        <span key={i} className={`${tones[tone]} px-[0.22em] py-[0.14em] shadow-block`} style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
