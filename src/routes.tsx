import type { ComponentType } from "react";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { OurStoryPage } from "./pages/OurStoryPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { WeddingCateringPage } from "./pages/WeddingCateringPage";
import { CorporateCateringPage } from "./pages/CorporateCateringPage";
import { NowruzCateringPage } from "./pages/NowruzCateringPage";

// Single source of truth for every real route: which component renders it,
// and which static .html file in the project root it's built from (used by
// scripts/prerender.mjs to know which dist/*.html to inject into).
export interface Route {
  path: string;
  htmlFile: string;
  Component: ComponentType;
}

export const ROUTES: Route[] = [
  { path: "/", htmlFile: "index.html", Component: HomePage },
  { path: "/menu", htmlFile: "menu.html", Component: MenuPage },
  { path: "/our-story", htmlFile: "our-story.html", Component: OurStoryPage },
  { path: "/faq", htmlFile: "faq.html", Component: FaqPage },
  { path: "/contact", htmlFile: "contact.html", Component: ContactPage },
  { path: "/wedding-catering", htmlFile: "wedding-catering.html", Component: WeddingCateringPage },
  { path: "/corporate-catering", htmlFile: "corporate-catering.html", Component: CorporateCateringPage },
  { path: "/nowruz-catering", htmlFile: "nowruz-catering.html", Component: NowruzCateringPage },
];

// Normalizes variants of a path to the canonical route path: a trailing
// ".html" (vite preview/dev serve files this way — cleanUrls.json only
// rewrites these on Vercel itself), "/index.html" -> "/", and a trailing
// slash other than the root. Prerendering always calls this with an already
// -canonical path from ROUTES, so normalizing here is a no-op for that case.
export function normalizePath(path: string): string {
  let p = path.replace(/\.html$/, "");
  if (p.endsWith("/index")) p = p.slice(0, -"index".length);
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function getRouteByPath(path: string): Route {
  const normalized = normalizePath(path);
  const route = ROUTES.find((r) => r.path === normalized);
  if (!route) throw new Error(`No route registered for path "${path}" (normalized: "${normalized}")`);
  return route;
}
