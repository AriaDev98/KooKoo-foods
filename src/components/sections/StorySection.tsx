import { SplitFeature } from "../layout/SplitFeature";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export function StorySection() {
  return (
    <SplitFeature
      imageSide="right"
      surface="cream"
      minHeight="560px"
      imageSrc="/images/photos/founder-cake.jpg"
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
            I am an immigrant from Iran who moved to Australia to run my own business, follow my
            passion and share the rich traditions of Persian cuisine through baked and cooked foods.
          </p>
          <p className="m-0">
            Our food carries stories — some rooted in specific regions, others passed down through
            families and tribes. Kookoo Foods has been cooking since <b className="font-bold">2024</b>,
            and every order is still made by hand.
          </p>
        </div>
        <Badge tone="sage">Based at FoodLab, Strathfield South</Badge>
        <figure className="m-0 mt-10 max-w-[30em]">
          <Reveal>
            <Photo
              src="/images/photos/ash-reshteh-making.jpg"
              alt="plating Ash Reshteh at the market stall"
              ratio="4 / 3"
            />
          </Reveal>
          <figcaption className="mt-4 font-ui text-body-sm font-semibold text-green-500">
            Finishing bowls of Ash Reshteh to order.
          </figcaption>
        </figure>
      </div>
    </SplitFeature>
  );
}
