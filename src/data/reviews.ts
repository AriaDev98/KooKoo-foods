// Real quotes from Kookoo Foods' Google Business Profile, copied exactly —
// no edits. Attributed by first name + last initial, matching how public
// reviews are commonly quoted. Only 5-star reviews are featured here, to
// match the star row the carousel always renders next to each quote —
// checked each one's actual rating individually via the review's
// accessibility label (star counts from a quick visual read are easy to
// misjudge at small sizes) before adding it.
//
// Checked and current as of 26 Oct 2026: 4.9 average across 11 reviews on
// Google (10 five-star, 1 four-star from Choay Wah Wong — not quoted here
// for the reason above; one earlier review, from Lea Tocino, is a
// star-only rating with no written text).
// When new reviews come in, just add another entry here — and update the
// "4.9★" badge in ReviewsSection.tsx if the average has moved.
export interface ReviewItem {
  name: string;
  text: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    name: "Negin M.",
    text: "Absolutely delicious Persian food! Everything was good, full of flavour, and cooked to perfection. The food was authentic and the service was lovely. recommend this place to anyone who loves great Persian cuisine!",
  },
  {
    name: "Zahra",
    text: "Amazing homemade food with so much love in every bite! Always fresh, delicious, and comforting.",
  },
  {
    name: "Sara T.",
    text: "The kebab is absolutely delicious, juicy, and full of flavour! It tastes just like homemade kebab made with love. Definitely one of my favourites! 😋",
  },
  {
    name: "M.Y.",
    text: "Kookoo Food tastes just like your mum's homemade cooking, made with love! ❤️ I've tried the dips, koofteh, achma, ash, and kebab, and have ordered many of them multiple times. Everything is absolutely delicious and feels like a little taste of home. Highly recommend! 🥰",
  },
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
