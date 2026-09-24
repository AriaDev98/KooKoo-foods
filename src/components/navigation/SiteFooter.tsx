import { FOOTER_COLUMNS, SITE } from "../../data/content";
import { SocialLinks } from "../ui/SocialLinks";
import { LivingBackground } from "../ui/LivingBackground";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-green-800 text-cream-200 px-6 sm:px-10 pt-20 pb-10">
      <LivingBackground />
      <div className="relative z-10 max-w-[1180px] mx-auto flex flex-wrap gap-16 justify-between">
        <div className="max-w-[36ch]">
          <div className="font-marker text-h3 uppercase tracking-marker">{SITE.brand}</div>
          <p className="font-body text-body-md text-sage-300 mt-4">
            Authentic Persian flavours, homemade with heart, cooked at FoodLab Strathfield South and
            delivered across New South Wales.
          </p>
          <SocialLinks tone="onDark" className="mt-6" />
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <div className="font-ui text-eyebrow font-bold uppercase tracking-eyebrow text-sage-300">
              {col.title}
            </div>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline w-fit font-ui text-body-md font-semibold text-cream-200 transition-colors duration-150 ease-standard hover:text-amber-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-[1180px] mx-auto mt-16 pt-6 border-t border-[rgba(240,235,220,0.24)] font-ui text-caption text-sage-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="m-0">
          &copy; {new Date().getFullYear()} Kookoo Foods &middot; ABN {SITE.abn}. All rights reserved.
        </p>
        <p className="m-0">
          Persian cuisine, established 2024. Food safety registration through FoodLab Sydney.
        </p>
      </div>
    </footer>
  );
}
