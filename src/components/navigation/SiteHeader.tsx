import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { CreepyButton } from "../ui/CreepyButton";
import { NAV_ITEMS, HEADER_CTA, SITE } from "../../data/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="relative bg-green-800">
      {/* Compact bar + slide-down menu, phones only */}
      <div className="sm:hidden flex items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center no-underline">
          <img
            src="/images/logos/kookoo-logo-gold.png"
            alt={SITE.brand}
            className="h-10 w-auto transition-transform duration-150 ease-standard group-hover:scale-105"
          />
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 p-2 text-cream-100 transition-transform duration-200 ease-standard"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className="sm:hidden absolute inset-x-0 top-full z-50 flex flex-col gap-5 border-t border-[rgba(240,235,220,0.24)] bg-green-800 px-6 py-8 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms var(--ease-standard), transform 220ms var(--ease-standard)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setOpen(false)}
            className="font-ui text-body-lg font-extrabold text-cream-200 no-underline"
          >
            {item.label}
          </a>
        ))}
        <Button
          variant="primary"
          size="md"
          href={HEADER_CTA.href}
          onClick={() => setOpen(false)}
          fullWidth
          className="mt-2"
        >
          {HEADER_CTA.label}
        </Button>
      </div>

      {/* Tall centered masthead, tablet and up */}
      <div className="hidden sm:block relative px-10 pt-10 pb-12">
        <div className="absolute top-10 right-10">
          <CreepyButton href={HEADER_CTA.href}>{HEADER_CTA.label}</CreepyButton>
        </div>
        <div className="flex flex-col items-center gap-10">
          <a href="#top" className="group">
            <img
              src="/images/logos/kookoo-logo-gold.png"
              alt={SITE.brand}
              className="h-[120px] w-auto transition-transform duration-150 ease-standard group-hover:scale-105"
            />
          </a>
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
      </div>
    </header>
  );
}
