import type { ReactNode } from "react";

type Tone = "cream" | "sage" | "green" | "amber";

const tones: Record<Tone, string> = {
  cream: "bg-cream-100 text-green-700",
  sage: "bg-sage-300 text-green-800",
  green: "bg-green-800 text-cream-200",
  amber: "bg-amber-200 text-green-800",
};

export function Card({
  children,
  tone = "cream",
  bordered = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl p-8 ${tones[tone]} ${
        bordered ? "shadow-[inset_0_0_0_1px_var(--color-cream-400)]" : "shadow-card"
      } ${className}`}
    >
      {children}
    </div>
  );
}
