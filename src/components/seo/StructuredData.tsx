import { SITE } from "../../data/content";
import { DISHES, FILTERS, type DishCourse } from "../../data/dishes";
import { FAQ } from "../../data/faq";

const SITE_URL = "https://www.kookoofoods.com.au/";

// Built from the same DISHES array the menu renders, grouped by course in
// the same order as the menu's own filter tabs — editing a dish in
// data/dishes.ts updates this automatically on the next build, no separate
// copy to keep in sync.
function buildMenu() {
  const courses = FILTERS.filter((f): f is DishCourse => f !== "All");
  return {
    "@type": "Menu",
    name: "Kookoo Foods Menu",
    hasMenuSection: courses.map((course) => ({
      "@type": "MenuSection",
      name: course,
      hasMenuItem: DISHES.filter((d) => d.course === course).map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        description: d.desc,
      })),
    })),
  };
}

// Built from the same FAQ array the FAQ section renders — adding, editing
// or removing a question there updates this automatically.
function buildFaqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: SITE.brand,
    description:
      "Authentic Persian catering, homemade with heart. Cooked to order at FoodLab Strathfield South and delivered across New South Wales.",
    url: SITE_URL,
    logo: `${SITE_URL}images/logos/kookoo-logo-gold.png`,
    image: `${SITE_URL}images/og-image.jpg`,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    servesCuisine: "Persian",
    areaServed: {
      "@type": "State",
      name: "New South Wales",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "34 Cosgrove Rd",
      addressLocality: "Strathfield South",
      addressRegion: "NSW",
      postalCode: "2136",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.897,
      longitude: 151.077,
    },
    sameAs: [SITE.instagramUrl, SITE.facebookUrl],
    hasMenu: buildMenu(),
  };

  const faqData = buildFaqPage();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
