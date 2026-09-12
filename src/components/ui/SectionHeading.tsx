import type { ReactNode } from "react";
import { IconTile, type IconName } from "./IconTile";

type IconTone = "clay" | "green" | "amber" | "sage";
type TextColor = "clay" | "green" | "cream";

const colors: Record<TextColor, string> = {
  clay: "text-clay-700",
  green: "text-green-800",
  cream: "text-cream-200",
};

export function SectionHeading({
  children,
  icon,
  tone = "clay",
  color = "clay",
  align = "start",
}: {
  children: ReactNode;
  icon?: IconName;
  tone?: IconTone;
  color?: TextColor;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-5 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {icon ? <IconTile icon={icon} tone={tone} /> : null}
      <h2
        className={`m-0 font-marker font-normal text-marker uppercase leading-[1.1] tracking-marker ${colors[color]}`}
      >
        {children}
      </h2>
    </div>
  );
}
