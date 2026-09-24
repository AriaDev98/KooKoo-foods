export const SITE = {
  brand: "Kookoo Foods",
  phone: "95 899 063 084",
  phoneHref: "tel:95899063084",
  email: "kookoofoods.au@gmail.com",
  instagramHandle: "@kookoo.au",
  instagramUrl: "https://instagram.com/kookoo.au",
  facebookUrl: "https://www.facebook.com/kookoo.au.2025",
  address: {
    kitchen: "FoodLab",
    line: "34 Cosgrove Rd, Strathfield South",
    region: "NSW 2136",
  },
  // Google resolves the business by name and address and draws its own pin, which stays
  // anchored to the location while the visitor zooms and pans.
  mapEmbedUrl:
    "https://maps.google.com/maps?q=FoodLab+34+Cosgrove+Rd+Strathfield+South+NSW+2136&z=16&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=FoodLab+34+Cosgrove+Rd+Strathfield+South+NSW+2136",
};

export const NAV_ITEMS = [
  { id: "menu", label: "Menu", href: "#menu" },
  { id: "pantry", label: "Jars & pantry", href: "#pantry" },
  { id: "story", label: "Our story", href: "#story" },
  { id: "enquire", label: "Contact", href: "#enquire" },
];

export const HEADER_CTA = { label: "Enquire now", href: "#enquire" };

export const STEPS = [
  {
    n: "01",
    title: "Tell us the date",
    desc: "Send the date, the number of guests and anything anyone cannot eat — minimum 10 guests.",
  },
  {
    n: "02",
    title: "We plan the menu",
    desc: "We come back with a spread and a price. Change what you like until it is the table you wanted.",
    link: { label: "Pick your dishes", href: "#menu" },
  },
  {
    n: "03",
    title: "We cook it fresh",
    desc: "Everything is cooked to order at FoodLab on the day. Delivered to you, or collect it from the kitchen.",
  },
];

export const OCCASIONS = [
  "Weddings",
  "Birthdays",
  "Corporate lunches",
  "Nowruz and Persian occasions",
  "Funerals and memorials",
  "Community events",
  "Small home gatherings",
];

export const PANTRY = [
  {
    src: "/images/photos/crackers-hands-2.jpg",
    name: "Persian crackers",
    desc: "Seeded, snappable crackers in a sealed pack — made to go with kashke bademjan.",
  },
  {
    src: "/images/photos/jars.jpg",
    name: "Jars and relishes",
    desc: "Small-batch preserves, put up by hand. Ask what is on the shelf this week.",
  },
  {
    src: "/images/photos/samanu.jpg",
    name: "Samanu",
    desc: "Persian wheat-sprout pudding, dark and slow-cooked. A Nowruz table staple.",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    src: "/images/photos/auchma-sesame.jpg",
    label: "brushing the egg wash",
    caption: "Rolled by hand, then brushed with egg wash.",
  },
  {
    n: "02",
    src: "/images/photos/auchma-eggwash.jpg",
    label: "sprinkling the sesame",
    caption: "Sesame seeds scattered over the glaze.",
  },
  {
    n: "03",
    src: "/images/photos/auchma-hero-studio.jpg",
    label: "baked and glazed",
    caption: "Out of the oven — golden, flaky, sesame-crusted.",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Menu",
    links: [
      { label: "All dishes", href: "#menu" },
      { label: "How it works", href: "#how" },
      { label: "Sweets", href: "#menu" },
    ],
  },
  {
    title: "Catering",
    links: [
      { label: "Book your event", href: "#enquire" },
      { label: "Jars & pantry", href: "#pantry" },
      { label: "Delivery across NSW", href: "#enquire" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: SITE.phone, href: SITE.phoneHref },
    ],
  },
];
