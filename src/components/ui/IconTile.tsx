import {
  Camera,
  ChefHat,
  CookingPot,
  Leaf,
  Mail,
  NotebookPen,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "cooking-pot"
  | "utensils"
  | "leaf"
  | "users"
  | "chef-hat"
  | "notebook-pen"
  | "mail"
  | "camera";

type Tone = "clay" | "green" | "amber" | "sage";

const icons: Record<IconName, LucideIcon> = {
  "cooking-pot": CookingPot,
  utensils: Utensils,
  leaf: Leaf,
  users: Users,
  "chef-hat": ChefHat,
  "notebook-pen": NotebookPen,
  mail: Mail,
  camera: Camera,
};

const tones: Record<Tone, string> = {
  clay: "bg-clay-700 text-cream-200",
  green: "bg-green-800 text-cream-200",
  amber: "bg-amber-500 text-green-800",
  sage: "bg-sage-300 text-green-800",
};

const sizes = { sm: 40, md: 56, lg: 72 } as const;

export function IconTile({
  icon,
  tone = "clay",
  size = "md",
}: {
  icon: IconName;
  tone?: Tone;
  size?: keyof typeof sizes;
}) {
  const Icon = icons[icon];
  const px = sizes[size];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center flex-none rounded-tile ${tones[tone]}`}
      style={{ width: px, height: px }}
    >
      <Icon size={Math.round(px * 0.5)} strokeWidth={2} />
    </span>
  );
}
