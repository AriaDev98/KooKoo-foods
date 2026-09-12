# Kookoo Foods — Catering Website

Marketing site for **Kookoo Foods**, a Persian home-kitchen catering business
operating out of FoodLab in Strathfield South, NSW. Built in React, TypeScript
and Tailwind CSS from an original visual design created in
[Claude Design](https://claude.ai/design).

## Features

- Filterable menu (by course and gluten-free) across 20 dishes
- Flip-card photo gallery showing ingredients and allergens per dish
- Catering enquiry form (client-side validated, opens a pre-filled email)
- Fully responsive, from mobile up to wide desktop
- Embedded map and directions to the kitchen

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev/build tooling
- [Tailwind CSS 4](https://tailwindcss.com/) for styling, driven by design
  tokens (colours, type, radii, shadows) lifted from the original design system
- [lucide-react](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and produce a production build in dist/
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

## Project structure

```
src/
  components/
    ui/          # Button, Card, Badge, SectionHeading, form controls, etc.
    layout/      # Hero, SplitFeature
    navigation/  # SiteHeader, StickyBar, BackToTop, SiteFooter
    sections/    # One component per homepage section (menu, gallery, ...)
  data/          # Site copy and content: dishes, gallery captions, nav, etc.
  hooks/         # Shared hooks (scroll state)
public/
  images/        # Optimized photography and logos
```

## Design provenance

This site was originally mocked up in Claude Design and handed off as a set
of `.dc.html` prototypes plus a design system ("Greenhouse"), kept locally
under `kookoo-foods-catering-website/` for reference (not committed — see
`.gitignore`). Colours, type and spacing in `src/index.css` and the UI
components in `src/components/ui` and `src/components/layout` were ported
from that design system, with Kookoo Foods' own amber accent override
applied. All photography was re-encoded from the original PNGs to optimized
JPEGs under `public/images/photos`.
