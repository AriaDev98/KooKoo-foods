import type { ReactNode } from "react";

type Tone = "sage" | "amber" | "clay" | "cream" | "green";

const tones: Record<Tone, string> = {
  sage: "bg-sage-200 text-green-700",
  amber: "bg-amber-200 text-amber-600",
  clay: "bg-clay-200 text-clay-700",
  cream: "bg-cream-300 text-green-800",
  green: "bg-green-800 text-cream-200",
};

export function Badge({ children, tone = "sage" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-block font-ui text-eyebrow font-bold uppercase tracking-eyebrow leading-none rounded-full px-3 py-[6px] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
