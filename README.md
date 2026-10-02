# Kookoo Foods — Catering Website

Marketing and enquiry site for **Kookoo Foods**, a Persian home-kitchen
catering business operating out of FoodLab in Strathfield South, NSW. Built
in React, TypeScript and Tailwind CSS from an original visual design created
in [Claude Design](https://claude.ai/design).

Live at **[kookoofoods.com.au](https://www.kookoofoods.com.au)**.

## Features

- Filterable menu (by course and gluten-free) across 30+ dishes
- Flip-card photo gallery showing ingredients and allergens per dish
- Catering enquiry form, backed by a Vercel serverless function
  ([`api/enquire.ts`](api/enquire.ts)) that emails the enquiry via
  [Resend](https://resend.com) — including an automatic confirmation email
  to the customer — with honeypot spam protection and a phone fallback if
  sending fails
- Pre-rendered to static HTML at build time for fast first paint, with
  client-side hydration for interactivity (see `scripts/prerender.mjs`)
- A standalone privacy policy page (`public/privacy-policy.html`)
- Fully responsive, from mobile up to wide desktop
- Embedded map and directions to the kitchen

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev/build tooling, with SSR + a prerender
  step for static HTML output
- [Tailwind CSS 4](https://tailwindcss.com/) for styling, driven by design
  tokens (colours, type, radii, shadows) lifted from the original design system
- [lucide-react](https://lucide.dev/) for icons
- [Resend](https://resend.com) + a Vercel serverless function for sending
  enquiry emails, sent from the verified `kookoofoods.com.au` domain
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check, build, and pre-render to dist/
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

The enquiry form posts to `/api/enquire`, a Vercel serverless function — it
isn't reachable from plain `npm run dev`. To exercise it locally you need
the Vercel CLI (`vercel dev`) and two environment variables:

- `RESEND_API_KEY` — a Resend API key
- `RESEND_FROM_EMAIL` — e.g. `Kookoo Foods <enquiries@kookoofoods.com.au>`
  (optional; falls back to Resend's shared sandbox sender, which can only
  deliver to the Resend account's own email address)

In production these are set as environment variables in the Vercel project
settings, scoped to both Production and Preview.

## Project structure

```
api/
  enquire.ts     # serverless function: validates + sends enquiry emails via Resend
src/
  components/
    ui/          # Button, Card, Badge, SectionHeading, form controls, etc.
    layout/      # Hero, SplitFeature
    navigation/  # SiteHeader, StickyBar, BackToTop, SiteFooter
    sections/    # One component per homepage section (menu, gallery, enquire, ...)
  context/       # TableContext — the "Your table" dish-picker (localStorage)
  data/          # Site copy and content: dishes, gallery captions, nav, etc.
  hooks/         # Shared hooks (scroll state, reveal-on-scroll, hydration guard)
  utils/         # Shared validation (email/phone) used by both the form and the API
  entry-client.tsx / entry-server.tsx   # hydration + SSR entry points
scripts/
  prerender.mjs  # injects the SSR'd HTML into dist/index.html at build time
public/
  images/        # Optimized photography and logos
  fonts/         # Self-hosted webfonts
  privacy-policy.html
```

## Design provenance

This site was originally mocked up in Claude Design and handed off as a set
of `.dc.html` prototypes plus a design system ("Greenhouse"), kept locally
under `kookoo-foods-catering-website/` for reference (not committed — see
`.gitignore`). Colours, type and spacing in `src/index.css` and the UI
components in `src/components/ui` and `src/components/layout` were ported
from that design system, with Kookoo Foods' own amber accent override
applied. All photography was re-encoded from the original PNGs to optimized
formats under `public/images/photos`.
