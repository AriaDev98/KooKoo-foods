import { Button } from "../ui/Button";
import { NAV_ITEMS, HEADER_CTA, SITE } from "../../data/content";

export function SiteHeader() {
  return (
    <header className="relative bg-green-800 px-6 sm:px-10 pt-10 pb-12">
      <div className="absolute top-10 right-6 sm:right-10">
        <Button marker size="sm" href={HEADER_CTA.href}>
          {HEADER_CTA.label}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-10">
        <img src="/images/logos/kookoo-logo-gold.png" alt={SITE.brand} className="h-24 sm:h-[120px] w-auto" />
        <nav className="flex flex-wrap justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="font-ui text-body-lg font-extrabold text-cream-200 no-underline transition-colors duration-150 ease-standard hover:text-amber-500"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
