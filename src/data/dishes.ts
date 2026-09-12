export type DishCourse = "Appetizer" | "Side" | "Main" | "Salad" | "Sweets";
export type DishTagTone = "amber" | "sage";
export type DishTag = { label: string; tone: DishTagTone };

export interface Dish {
  name: string;
  course: DishCourse;
  desc: string;
  tags: DishTag[];
}

export const FILTERS: Array<DishCourse | "All"> = [
  "All",
  "Appetizer",
  "Side",
  "Main",
  "Salad",
  "Sweets",
];

export const DISHES: Dish[] = [
  {
    name: "Kashke Bademjan (Persian Eggplant Dip)",
    course: "Appetizer",
    desc: "Roasted eggplant with fried onion, garlic and kashk, dried mint and walnuts, crackers on the side.",
    tags: [{ label: "CN", tone: "amber" }],
  },
  {
    name: "Mirza ghasemi",
    course: "Appetizer",
    desc: "Smoked eggplant cooked down with tomato and plenty of garlic.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
  },
  {
    name: "Dolmeh",
    course: "Appetizer",
    desc: "Vine leaves rolled around a herb and rice filling, slow-cooked until soft.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
  },
  {
    name: "Kookoo sibzamini",
    course: "Appetizer",
    desc: "Golden potato patties, crisp at the edge and soft through the middle.",
    tags: [{ label: "Veg", tone: "sage" }],
  },
  {
    name: "Zucchini Kookoo",
    course: "Appetizer",
    desc: "Kuku kadoo — zucchini and potato omelette with fried onions and herbs.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
  },
  {
    name: "Persian Rice",
    course: "Side",
    desc: "Steamed rice with saffron, carrot and orange zest, raisins, shaved almonds and pistachio.",
    tags: [
      { label: "GF", tone: "sage" },
      { label: "V", tone: "sage" },
      { label: "CN", tone: "amber" },
    ],
  },
  {
    name: "Kotlet",
    course: "Side",
    desc: "Pan-fried potato and beef patties. The lunchbox classic of every Iranian childhood.",
    tags: [],
  },
  {
    name: "Zeitun parvarde",
    course: "Side",
    desc: "Olives dressed with walnut, pomegranate paste, garlic and mint — sharp, sweet and northern.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "CN", tone: "amber" },
    ],
  },
  {
    name: "Mom's and dad's pickles",
    course: "Side",
    desc: "Our family torshi, put up by hand in small batches. Vinegar, vegetables, herbs and time.",
    tags: [
      { label: "V", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
  },
  {
    name: "Maste khiar",
    course: "Side",
    desc: "Yoghurt with cucumber, dried mint and a little garlic. Cool, and on every Persian table.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
  },
  {
    name: "Koofteh (Persian Meatballs)",
    course: "Main",
    desc: "Lamb and beef meatballs with onion, chickpeas, rice, herbs and dried plum.",
    tags: [
      { label: "GF", tone: "sage" },
      { label: "DF", tone: "sage" },
    ],
  },
  {
    name: "Ghormeh sabzi",
    course: "Main",
    desc: "Slow-cooked herbs with lamb, kidney beans and dried lime — the stew every Persian table knows.",
    tags: [
      { label: "GF", tone: "sage" },
      { label: "DF", tone: "sage" },
    ],
  },
  {
    name: "Kabab koobideh",
    course: "Main",
    desc: "Hand-minced lamb and beef skewers, charcoal-grilled, served with saffron rice.",
    tags: [],
  },
  {
    name: "Zereshk polo ba morgh",
    course: "Main",
    desc: "Saffron chicken with barberry rice — sweet, sour and the dish everyone asks for again.",
    tags: [],
  },
  {
    name: "Tahchin",
    course: "Main",
    desc: "Baked saffron rice cake with a crisp golden crust, layered with chicken.",
    tags: [],
  },
  {
    name: "Chicken auchma",
    course: "Main",
    desc: "Baked chicken and onion folded into an enriched dough, served with dips on the side.",
    tags: [],
  },
  {
    name: "Pear, Carrot and Herb Salad",
    course: "Salad",
    desc: "Carrot, beetroot, spinach, pear, cabbage and lettuce in an olive oil dressing.",
    tags: [
      { label: "GF", tone: "sage" },
      { label: "V", tone: "sage" },
    ],
  },
  {
    name: "Gluten-free cake",
    course: "Sweets",
    desc: "Baked to order for the table that needs it, and good enough for the table that does not.",
    tags: [{ label: "GF", tone: "sage" }],
  },
  {
    name: "Chocolate cake",
    course: "Sweets",
    desc: "Dark, dense and not too sweet — the way it is served with tea at home.",
    tags: [],
  },
  {
    name: "Lemon cake",
    course: "Sweets",
    desc: "Bright and syrupy, cut into squares for a crowd.",
    tags: [],
  },
];

export function isGlutenFree(dish: Dish): boolean {
  return dish.tags.some((t) => t.label === "GF");
}

export function matchesFilter(
  dish: Dish,
  filter: (typeof FILTERS)[number],
  gfOnly: boolean,
): boolean {
  if (gfOnly && !isGlutenFree(dish)) return false;
  return filter === "All" || dish.course === filter;
}
