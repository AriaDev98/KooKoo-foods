import { useScrolled } from "../../hooks/useScrolled";
import { NAV_ITEMS, SITE } from "../../data/content";

export function StickyBar() {
  const scrolled = useScrolled();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-6 bg-green-800 px-8 py-[10px] shadow-[0_6px_24px_-12px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-standard"
      style={{ transform: scrolled ? "translateY(0)" : "translateY(-102%)" }}
    >
      <a href="#top" className="flex items-center gap-4 no-underline">
        <img src="/images/logos/kookoo-logo-gold.png" alt={SITE.brand} className="h-[34px] w-auto block" />
        <span className="font-display text-body-md font-extrabold tracking-tight text-cream-100">
          {SITE.brand}
        </span>
      </a>
      <div className="flex flex-wrap items-center gap-6">
        <nav className="hidden min-[761px]:flex items-center gap-6 flex-wrap">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="font-ui text-body-sm font-bold text-cream-100 no-underline py-[6px] border-b-2 border-transparent transition-colors duration-150 ease-standard hover:text-amber-400 hover:border-amber-500"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={SITE.phoneHref}
          className="font-ui text-body-sm font-extrabold no-underline text-green-800 bg-amber-500 px-[18px] py-[10px] transition-colors duration-150 ease-standard hover:bg-amber-400 max-[460px]:hidden"
        >
          Call {SITE.phone}
        </a>
        <a
          href="#enquire"
          className="font-ui text-body-sm font-extrabold no-underline text-cream-100 border-2 border-cream-100 px-[18px] py-2 transition-colors duration-150 ease-standard hover:text-amber-400 hover:border-amber-400"
        >
          Enquire
        </a>
      </div>
    </div>
  );
}
