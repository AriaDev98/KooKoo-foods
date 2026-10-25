// Real quotes from Kookoo Foods' Google Business Profile, copied exactly —
// no edits. Attributed by first name + last initial, matching how public
// reviews are commonly quoted. Checked and current as of 25 Oct 2026 (5.0
// average across 6 reviews on Google; the sixth, from Lea Tocino, is a
// star-only rating with no written text, so there's no quote to feature).
// When new reviews come in, just add another entry here.
export interface ReviewItem {
  name: string;
  text: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    name: "Jamie L.",
    text: "Incredible food. Some of the best Persian food I've ever eaten. And incredibly fresh too. Customer service is 5 stars as well ❤️❤️",
  },
  {
    name: "Hojat N.",
    text: "We had a great experience with Kookoo Foods at Biennale Sydney Markets. The food was delicious, fresh, and full of flavour. We especially enjoyed the koobideh kebab, and koofteh, everything was cooked really well and tasted amazing :) . The portion sizes were generous, and the price was very reasonable for the quality and quantity. Friendly service and great food overall. Highly recommended!!!!",
  },
  {
    name: "Gita B.",
    text: "I ordered a chocolate cake and had a wonderful experience. The cake was incredibly soft, light, and fluffy, with just the right amount of sweetness. It was also beautifully decorated, and most importantly, the price was very reasonable. Overall, I was very happy with my order!",
  },
  {
    name: "Romina M.",
    text: "At a party in Sydney, I tried Zereshk Polo with chicken and Keshk-e Bademjan. They were truly delicious and offered a new taste for me.",
  },
  {
    name: "Leila",
    text: "I've tried both your Persian dishes and pastries, and everything was absolutely delicious! 😍 Amazing taste and quality. Highly recommended! ❤️",
  },
];
