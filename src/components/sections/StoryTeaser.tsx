import { SplitFeature } from "../layout/SplitFeature";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function StoryTeaser() {
  return (
    <SplitFeature imageSide="left" surface="cream" minHeight="440px" imageSrc="/images/photos/founder-cake.webp" imageLabel="the baker with a finished cake at FoodLab" revealImage>
      <Reveal>
        <SectionHeading icon="notebook-pen" tone="clay">
          Our story
        </SectionHeading>
        <h2 className="mt-6 mb-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
          Recipes that travelled with us
        </h2>
      </Reveal>
      <p className="m-0 mb-8 font-body text-body-lg leading-relaxed text-green-700 max-w-[34em]">
        I am an immigrant from Iran who moved to Australia to run my own business, follow my passion
        and share the rich traditions of Persian cuisine through baked and cooked foods.
      </p>
      <Button variant="outline" size="md" href="/our-story">
        Read our story
      </Button>
    </SplitFeature>
  );
}
