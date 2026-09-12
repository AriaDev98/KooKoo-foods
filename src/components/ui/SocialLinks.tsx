import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { SITE } from "../../data/content";

type Tone = "onDark" | "onLight";

const tones: Record<Tone, string> = {
  onDark: "bg-[rgba(240,235,220,0.12)] text-cream-200",
  onLight: "bg-sage-200 text-green-800",
};

const links = [
  { label: "Instagram", href: SITE.instagramUrl, Icon: FaInstagram },
  { label: "Facebook", href: SITE.facebookUrl, Icon: FaFacebook },
];

export function SocialLinks({
  tone = "onDark",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Kookoo Foods on ${label}`}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 ease-standard hover:bg-amber-500 hover:text-green-800 ${tones[tone]}`}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
