export type DishCourse = "Appetizer" | "Side" | "Main" | "Salad" | "Sweets";
export type DishTagTone = "amber" | "sage";
export type DishTag = { label: string; tone: DishTagTone };

export interface DishPhoto {
  src: string;
  ingredients: string;
  allergens: string;
}

export interface Dish {
  name: string;
  course: DishCourse;
  desc: string;
  tags: DishTag[];
  photo?: DishPhoto;
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
    photo: {
      src: "/images/photos/kashke-bademjan-tray.jpg",
      ingredients:
        "Roasted eggplant, fried onion, garlic, kashk, dried mint, walnuts, olive oil. Crackers on the side.",
      allergens:
        "Contains walnuts. Kashk is a dairy product — ask for the dairy-free version. Crackers contain gluten.",
    },
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
    name: "Ash Reshteh",
    course: "Appetizer",
    desc: "Persian herb and noodle soup with chickpeas, lentils, beans, crispy fried onions and kashk.",
    tags: [{ label: "Veg", tone: "sage" }],
    photo: {
      src: "/images/photos/ash-reshteh.jpg",
      ingredients:
        "Persian herb and noodle soup with chickpeas, lentils, beans, fresh herbs, crispy fried onions and kashk. A vegetarian favourite.",
      allergens:
        "Contains gluten in the noodles and dairy in the kashk — ask for it without. No nuts.",
    },
  },
  {
    name: "Dolmeh",
    course: "Appetizer",
    desc: "Vine leaves rolled around a herb and rice filling, slow-cooked until soft.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
    photo: {
      src: "/images/photos/dolmeh-full.jpg",
      ingredients:
        "Cabbage leaves wrapped around a filling of fresh herbs and rice, slow-cooked and finished with tomato, parsley and red onion.",
      allergens: "Gluten free, dairy free, nut free.",
    },
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
    photo: {
      src: "/images/photos/jars.jpg",
      ingredients: "Mixed vegetables, vinegar, herbs and garlic, put up by hand in small batches.",
      allergens: "Gluten free, dairy free, nut free.",
    },
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
    photo: {
      src: "/images/photos/ghormeh-sabzi.jpg",
      ingredients:
        "Slow-cooked herbs — parsley, coriander, fenugreek — with lamb, red kidney beans, dried lime and onion.",
      allergens: "Gluten free, dairy free, nut free. Served with saffron rice.",
    },
  },
  {
    name: "Kabab koobideh",
    course: "Main",
    desc: "Hand-minced lamb and beef skewers, charcoal-grilled, served with saffron rice.",
    tags: [],
    photo: {
      src: "/images/photos/koobideh.jpg",
      ingredients:
        "Hand-minced lamb and beef, grated onion, saffron, turmeric. Charcoal grilled, served with grilled tomato.",
      allergens:
        "The flatbread contains gluten — we swap in saffron rice on request. No nuts, no dairy.",
    },
  },
  {
    name: "Zereshk polo ba morgh",
    course: "Main",
    desc: "Saffron chicken with barberry rice — sweet, sour and the dish everyone asks for again.",
    tags: [],
    photo: {
      src: "/images/photos/barberry-rice-full.jpg",
      ingredients: "Chicken, onion, tomatoes, saffron, rice, Persian barberry.",
      allergens: "Gluten free, nut free. Served with pickles and olives on the side.",
    },
  },
  {
    name: "Tahchin",
    course: "Main",
    desc: "Baked saffron rice cake with a crisp golden crust, layered with chicken.",
    tags: [],
    photo: {
      src: "/images/photos/tahchin-v7.jpg",
      ingredients:
        "Baked saffron rice cake layered with chicken, yoghurt and egg, topped with barberries. Strong saffron flavour.",
      allergens: "Contains dairy and egg. Gluten free, nut free.",
    },
  },
  {
    name: "Chicken auchma",
    course: "Main",
    desc: "Baked chicken and onion folded into an enriched dough, served with dips on the side.",
    tags: [],
    photo: {
      src: "/images/photos/auchma-2.jpg",
      ingredients:
        "Wheat flour, egg, butter, chicken, onion, herbs, sesame seeds. Served with dips on the side.",
      allergens: "Contains gluten, egg, dairy and sesame.",
    },
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
    photo: {
      src: "/images/photos/cream-cake.jpg",
      ingredients: "Wheat flour, eggs, sugar, cream, vanilla, strawberries, blueberries.",
      allergens: "Contains gluten, egg and dairy. A gluten-free sponge is available to order.",
    },
  },
  {
    name: "Chocolate cake",
    course: "Sweets",
    desc: "Dark, dense and not too sweet — the way it is served with tea at home.",
    tags: [],
    photo: {
      src: "/images/photos/chocolate-cake-2.jpg",
      ingredients:
        "Dark chocolate sponge with a chocolate cream layer and a walnut and caramel middle, dusted with cocoa.",
      allergens: "Contains gluten, egg, dairy and walnuts.",
    },
  },
  {
    name: "Lemon cake",
    course: "Sweets",
    desc: "Bright and syrupy, cut into squares for a crowd.",
    tags: [],
    photo: {
      src: "/images/photos/semolina-lemon-cake.jpg",
      ingredients:
        "Semolina and wheat flour, eggs, sugar, yoghurt, lemon and a lemon syrup, finished with chopped pistachio.",
      allergens: "Contains gluten, egg, dairy and pistachio.",
    },
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
