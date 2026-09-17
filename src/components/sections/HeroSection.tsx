import { Hero } from "../layout/Hero";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <Hero
      headline={"A Taste of Persia,\nBrought to Your Table"}
      tone="dark"
      height="600px"
      className="bg-green-800"
      showScrollCue
    >
      <div className="flex flex-col items-center gap-8 max-w-[620px]">
        <p className="m-0 font-body text-lead leading-normal text-green-800 bg-[rgba(243,239,228,0.84)] shadow-block px-6 py-4 text-center">
          Authentic Persian flavours, homemade with heart. From backyard gatherings to big-day
          events.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" href="#menu">
            Browse the menu
          </Button>
          <Button variant="outlineInverse" size="lg" href="#enquire">
            Book your event
          </Button>
        </div>
      </div>
    </Hero>
  );
}
