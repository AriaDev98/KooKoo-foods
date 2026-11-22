// Every answer here restates a fact that already exists elsewhere on the
// site (the enquiry form copy, the how-it-works steps, the menu filters,
// SITE in content.ts) — nothing here is new information. Questions the
// site doesn't have an answer for (lead time, delivery fees) are left out
// rather than guessed at.
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "How much does catering cost?",
    answer:
      "As a guide, most spreads work out to about $35-$40 per person, depending on the dishes and quantities you choose, and that includes rice and sides. Tell us your date and guest numbers on the enquiry form and we'll send you an exact price, usually the same day.",
  },
  {
    question: "What's the minimum number of guests?",
    answer: "We cater from 10 guests up. For a smaller group, give us a call and we'll see what we can do.",
  },
  {
    question: "Which areas do you deliver to?",
    answer: "We deliver across New South Wales, including all of Sydney.",
  },
  {
    question: "Can I collect the food myself?",
    answer:
      "Yes — everything is cooked to order at FoodLab on the day of your event. You can have it delivered, or collect it from the kitchen yourself.",
  },
  {
    question: "Is it delivery only, or can you do buffet setup and serving staff too?",
    answer:
      "Delivery is our standard service. If you'd like buffet-style setup, serving staff, or extras like plates and cutlery for your event, mention it in your enquiry and we'll let you know what we can arrange.",
  },
  {
    question: "Do you have vegetarian, vegan and gluten-free options?",
    answer:
      "Yes. The menu can be filtered by course and by gluten-free, and every dish is tagged for vegetarian, vegan, gluten-free, dairy-free or contains-nuts, so you can see at a glance what suits your table.",
  },
  {
    question: "Can you handle allergies?",
    answer:
      "We list the ingredients and allergens for every dish on the menu, and you can tell us about any allergy when you enquire — we'll do our best to accommodate it. Everything is cooked in a shared kitchen at FoodLab that also handles gluten, dairy, eggs and nuts, so we can't guarantee a completely allergen-free environment.",
  },
  {
    question: "What events do you cater?",
    answer:
      "Weddings, birthdays, corporate lunches, Nowruz and other Persian occasions, funerals and memorials, community events, and small home gatherings.",
  },
  {
    question: "How do I get a quote, and how fast do you reply?",
    answer:
      "Fill in the enquiry form with your date, guest numbers and any dishes you like the look of. We reply with a spread and a price, usually the same day.",
  },
  {
    question: "Where is your kitchen?",
    answer: "FoodLab, 34 Cosgrove Rd, Strathfield South, NSW 2136.",
  },
];
