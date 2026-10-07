import { SplitFeature } from "../layout/SplitFeature";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";

export function StorySection() {
  return (
    <SplitFeature
      imageSide="right"
      surface="cream"
      minHeight="560px"
      imageSrc="/images/photos/founder-cake.webp"
      imageLabel="the baker with a finished cake at FoodLab"
      revealImage
    >
      <div id="story">
        <Reveal>
          <SectionHeading icon="notebook-pen" tone="clay">
            Our story
          </SectionHeading>
          <h2 className="mt-6 mb-8 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
            Recipes that travelled with us
          </h2>
        </Reveal>
        <div className="font-body text-body-lg leading-relaxed text-green-700 max-w-[34em] space-y-6 mb-8">
          <p className="m-0">
            I came to Australia from Iran to follow my passion, build my own business, and share the
            rich traditions of Persian cuisine.
          </p>
          <p className="m-0">
            Persian food carries stories — from different regions, families and generations. At
            Kookoo Foods, every dish is handmade with love, using recipes and traditions passed down
            through generations.
          </p>
          <p className="m-0">
            Since <b className="font-bold">2024</b>, we have been proudly supported and based at{" "}
            <a
              href="https://www.foodlabsydney.org.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-bold text-green-800"
            >
              FoodLab Sydney
            </a>
            , a community helping food entrepreneurs turn their passion into thriving businesses.
          </p>
          <p className="m-0">
            For us, Kookoo Foods is a way to share a little taste of Persian home with Australia.
          </p>
        </div>
        <Badge tone="sage">Based at FoodLab, Strathfield South</Badge>
      </div>
    </SplitFeature>
  );
}
