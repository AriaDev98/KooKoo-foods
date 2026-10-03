// Dish references here are names only, looked up against DISHES at render
// time (see getDish in occasionDishes) — so if a dish's description ever
// changes, every occasion page picks it up automatically instead of holding
// a second, driftable copy of the same text.

export interface OccasionPage {
  slug: string;
  href: string;
  cardLabel: string;
  /** Must exactly match one of the OCCASIONS values in content.ts — this is
   * what pre-selects the enquiry form's occasion dropdown via ?occasion=. */
  occasionValue: string;
  cardPhoto: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  dishesHeading: string;
  dishNames: string[];
  pantryNames?: string[];
  logistics: string;
  ctaLabel: string;
}

export const OCCASION_PAGES: OccasionPage[] = [
  {
    slug: "wedding-catering",
    href: "/wedding-catering",
    cardLabel: "Weddings",
    occasionValue: "Weddings",
    cardPhoto: "/images/photos/tahchin-v7.webp",
    title: "Persian Wedding Catering Sydney | Kookoo Foods",
    description:
      "Homemade Persian wedding catering in Sydney — cooked fresh at FoodLab and delivered across NSW. Minimum 10 guests, same-day quotes.",
    h1: "Persian Wedding Catering in Sydney",
    intro:
      "Authentic Persian food for your wedding, cooked fresh at FoodLab and delivered across New South Wales. We cater from 10 guests up, and reply with a spread and a price — usually the same day.",
    dishesHeading: "Dishes couples often build a table around",
    dishNames: [
      "Zereshk Polo ba Morgh (Saffron Chicken with Barberry Rice)",
      "Tahchin (Baked Saffron Rice Cake)",
      "Kabab Koobideh (Grilled Minced Lamb & Beef Skewers)",
      "Persian sweets platter",
      "Halva (Persian Style)",
    ],
    logistics:
      "Vegetarian, vegan, gluten-free and dairy-free options across the menu, clearly tagged. Delivered, or collect from FoodLab yourself. Tell us about any allergies when you enquire.",
    ctaLabel: "Tell us your date and guest numbers",
  },
  {
    slug: "corporate-catering",
    href: "/corporate-catering",
    cardLabel: "Corporate catering",
    occasionValue: "Corporate lunches",
    cardPhoto: "/images/photos/persian-rice.webp",
    title: "Corporate Catering Sydney | Persian Lunch | Kookoo Foods",
    description:
      "Persian corporate catering for Sydney offices — lunch platters, team events and functions, cooked fresh and delivered across NSW.",
    h1: "Corporate Catering, Persian-Style",
    intro:
      "Persian catering for Sydney offices — lunches, team events and functions, cooked fresh at FoodLab and delivered across New South Wales. Minimum 10 guests, with a spread and a price back from us usually the same day.",
    dishesHeading: "Dishes that suit a shared office lunch",
    dishNames: [
      "Persian Rice",
      "Tadig (Crispy Persian Rice)",
      "Meatball and Rice (Persian Style)",
      "Kotlet (Persian Beef & Potato Patties)",
      "Pear, Carrot and Herb Salad",
      "Mast O'Khiar (Yogurt and Cucumber Dip)",
      "Barbari bread",
    ],
    logistics:
      "Dishes are tagged vegetarian, vegan, gluten-free and dairy-free — useful for mixed dietary needs across a team. Delivered, or collect from FoodLab.",
    ctaLabel: "Get a quote for your next office event",
  },
  {
    slug: "nowruz-catering",
    href: "/nowruz-catering",
    cardLabel: "Nowruz & Persian occasions",
    occasionValue: "Nowruz and Persian occasions",
    cardPhoto: "/images/photos/samanu.webp",
    title: "Nowruz Catering Sydney | Persian New Year | Kookoo Foods",
    description:
      "Persian Nowruz catering for Sydney and NSW — traditional dishes for Persian New Year gatherings, homemade and cooked fresh at FoodLab.",
    h1: "Nowruz and Persian Occasion Catering",
    intro:
      "Traditional Persian dishes for Nowruz and other Persian occasions, homemade and cooked fresh at FoodLab, delivered across New South Wales.",
    dishesHeading: "Dishes for the table",
    dishNames: [
      "Ghormeh Sabzi (Persian Herb & Lamb Stew)",
      "Ash Reshteh (Persian Herb & Noodle Soup)",
    ],
    pantryNames: ["Samanu"],
    logistics:
      "Same minimum (10 guests), same NSW-wide delivery, same-day quotes, and full allergen information on every dish.",
    ctaLabel: "Planning a Nowruz gathering?",
  },
];

// The four occasions without a dedicated page — shown as small chips that
// deep-link into the enquiry form with the occasion pre-selected, rather
// than being left with nowhere to go.
export const OTHER_OCCASIONS = ["Birthdays", "Funerals and memorials", "Community events", "Small home gatherings"];
