export type DishCourse = "Appetizer" | "Side" | "Main" | "Salad" | "Sweets";
export type DishTagTone = "amber" | "sage";
export type DishTag = { label: string; tone: DishTagTone };

export interface DishPhoto {
  src: string;
  whole?: boolean;
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
    name: "Ash Reshteh (Persian Herb & Noodle Soup)",
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
    name: "Dolmeh (Stuffed Cabbage Rolls)",
    course: "Appetizer",
    desc: "Cabbage leaves rolled around a herb and rice filling, slow-cooked until soft.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
    photo: {
      src: "/images/photos/dolmeh-cabbage.jpg",
      ingredients:
        "Cabbage leaves wrapped around a filling of fresh herbs and rice, slow-cooked and finished with tomato, parsley and red onion.",
      allergens: "Gluten free, dairy free, nut free.",
    },
  },
  {
    name: "Mirza Ghasemi (Smoky Eggplant & Tomato Dip)",
    course: "Appetizer",
    desc: "Smoked eggplant cooked down with tomato and plenty of garlic.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
    photo: {
      src: "/images/photos/mirza-ghasemi.jpg",
      ingredients: "Smoked eggplant, tomato and garlic, cooked down and finished with fresh chives.",
      allergens: "Gluten free, dairy free, nut free.",
    },
  },
  {
    name: "Zucchini Kookoo",
    course: "Appetizer",
    desc: "Kuku kadoo — zucchini and potato omelette with fried onions and herbs.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
    ],
    photo: {
      src: "/images/photos/zucchini-kookoo.jpg",
      whole: true,
      ingredients: "Zucchini, potato, egg, onion and fresh herbs, pan-baked until golden.",
      allergens: "Contains egg. Gluten free, dairy free, nut free.",
    },
  },
  {
    name: "Kookoo Sibzamini (Persian Potato Patties)",
    course: "Appetizer",
    desc: "Golden potato patties, crisp at the edge and soft through the middle.",
    tags: [{ label: "Veg", tone: "sage" }],
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
    name: "Kotlet (Persian Beef & Potato Patties)",
    course: "Side",
    desc: "Pan-fried potato and beef patties. The lunchbox classic of every Iranian childhood.",
    tags: [],
    photo: {
      src: "/images/photos/kotlet.jpg",
      ingredients: "Potato, beef mince, onion and egg, coated and pan-fried until golden and crisp. Served with fresh tomato and herbs.",
      allergens: "Contains egg and gluten. Dairy free, nut free.",
    },
  },
  {
    name: "Zeitun Parvarde (Walnut & Pomegranate Olives)",
    course: "Side",
    desc: "Olives dressed with walnut, pomegranate paste, garlic and mint — sharp, sweet and northern.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "CN", tone: "amber" },
    ],
    photo: {
      src: "/images/photos/zeitun-parvarde.jpg",
      ingredients:
        "Green olives dressed with crushed walnuts, pomegranate paste, garlic and dried mint, finished with fresh pomegranate seeds.",
      allergens: "Contains walnuts. Gluten free, dairy free.",
    },
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
    name: "Persian crackers",
    course: "Side",
    desc: "Thin baked crackers with pumpkin, sunflower and sesame seeds, made to go with the eggplant dip.",
    tags: [{ label: "V", tone: "sage" }],
    photo: {
      src: "/images/photos/crackers-tray.jpg",
      ingredients:
        "Thin baked crackers with pumpkin seeds, sunflower seeds and sesame, snapped by hand into pieces. Made to go with the eggplant dip.",
      allergens: "Contains gluten and sesame. Contains seeds. No nuts, no dairy.",
    },
  },
  {
    name: "Barbari bread",
    course: "Side",
    desc: "Homemade barbari — golden, soft-crumbed flatbread, scored by hand and scattered with sesame.",
    tags: [{ label: "V", tone: "sage" }],
    photo: {
      src: "/images/photos/barbari-homemade.jpg",
      ingredients: "Flour, water, yeast, salt, topped with sesame seeds. Baked flat and scored by hand.",
      allergens: "Contains gluten and sesame. Dairy free, egg free, nut free.",
    },
  },
  {
    name: "Pitta bread",
    course: "Side",
    desc: "Soft flatbread, baked fresh and served warm alongside the dips and mains.",
    tags: [{ label: "Veg", tone: "sage" }],
    photo: {
      src: "/images/photos/pita-bread-v2.jpg",
      ingredients:
        "Flour and yoghurt. Soft flatbread, baked fresh and served warm alongside the dips and mains.",
      allergens: "Contains gluten and dairy. Egg free, nut free.",
    },
  },
  {
    name: "Mast O'Khiar (Yogurt and Cucumber Dip)",
    course: "Side",
    desc: "Yoghurt with cucumber, dried mint and a little garlic. Cool, and on every Persian table.",
    tags: [
      { label: "Veg", tone: "sage" },
      { label: "GF", tone: "sage" },
      { label: "CN", tone: "amber" },
    ],
    photo: {
      src: "/images/photos/maste-khiar.jpg",
      ingredients:
        "Yoghurt, diced cucumber, dried mint and garlic, finished with chopped walnuts and raisins.",
      allergens: "Contains walnuts. Dairy. Gluten free.",
    },
  },
  {
    name: "Koofteh (Persian Meatballs)",
    course: "Main",
    desc: "Lamb and beef meatballs with onion, chickpeas, rice, herbs and dried plum.",
    tags: [
      { label: "GF", tone: "sage" },
      { label: "DF", tone: "sage" },
    ],
    photo: {
      src: "/images/photos/koofteh-tomato.jpg",
      ingredients:
        "Lamb and beef mince, onion, chickpeas, rice, fresh herbs, dried plum, turmeric, tomato.",
      allergens: "Gluten free and dairy free as cooked. No nuts.",
    },
  },
  {
    name: "Ghormeh Sabzi (Persian Herb & Lamb Stew)",
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
    name: "Kabab Koobideh (Grilled Minced Lamb & Beef Skewers)",
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
    name: "Zereshk Polo ba Morgh (Saffron Chicken with Barberry Rice)",
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
    name: "Tahchin (Baked Saffron Rice Cake)",
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
    name: "Chicken Auchma (Baked Chicken Pastry)",
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
  {
    name: "Orange cake",
    course: "Sweets",
    desc: "Fresh orange folded through a moist sponge, finished with chopped pistachio.",
    tags: [{ label: "CN", tone: "amber" }],
    photo: {
      src: "/images/photos/orange-cake.jpg",
      ingredients: "Flour, eggs, yoghurt, milk, oil and fresh orange, finished with chopped pistachio.",
      allergens: "Contains gluten, egg, dairy and pistachio.",
    },
  },
  {
    name: "Cinnamon walnut roll",
    course: "Sweets",
    desc: "A sweet enriched dough rolled with walnuts, dates and cinnamon.",
    tags: [{ label: "CN", tone: "amber" }],
    photo: {
      src: "/images/photos/sweet-bread.jpg",
      ingredients: "Wheat flour, butter, eggs, milk, sugar, walnuts, dates, cinnamon.",
      allergens: "Contains gluten, egg, dairy and walnuts.",
    },
  },
  {
    name: "Persian sweets platter",
    course: "Sweets",
    desc: "A mixed tray — chickpea stars, almond crinkle cookies, chocolate buttons and almond-topped slices.",
    tags: [{ label: "CN", tone: "amber" }],
    photo: {
      src: "/images/photos/persian-sweets-tray2.jpg",
      ingredients:
        "Flour, eggs, butter, almond flour, cocoa powder. A mixed tray — chickpea stars, almond crinkle cookies, chocolate buttons and almond-topped slices.",
      allergens: "Contains gluten, egg, dairy and almonds.",
    },
  },
  {
    name: "Homemade Persian sweets",
    course: "Sweets",
    desc: "Almond slices baked into a short, buttery biscuit, cinnamon-dusted and finished with flaked almonds.",
    tags: [{ label: "CN", tone: "amber" }],
    photo: {
      src: "/images/photos/persian-sweets-2.jpg",
      ingredients:
        "Almond slices baked into a short, buttery biscuit and cut into fingers — cinnamon-dusted and finished with flaked almonds.",
      allergens: "Contains gluten, egg, dairy and almonds. Ask about the gluten-free options.",
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

// The uncropped landscape photo card is only as tall as its photo, so it looks
// right only in a row of short text cards. Whatever the filter, seat it between
// two text cards at a position that lands in the same row at 2 and 3 columns.
export function arrangeWholePhotos(list: Dish[]): Dish[] {
  const at = list.findIndex((d) => d.photo?.whole);
  if (at === -1) return list;
  const whole = list[at];
  const rest = list.filter((_, i) => i !== at);
  const isText = (d?: Dish) => !!d && !d.photo;

  for (let i = 1; i <= rest.length; i += 3) {
    if (isText(rest[i - 1]) && isText(rest[i])) {
      return [...rest.slice(0, i), whole, ...rest.slice(i)];
    }
  }

  const texts = rest.filter(isText);
  if (texts.length >= 2) {
    const [first, second] = texts;
    return [first, whole, second, ...rest.filter((d) => d !== first && d !== second)];
  }
  return list;
}
