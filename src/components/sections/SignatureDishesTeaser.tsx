import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { getDish } from "../../data/dishes";

const SIGNATURE_DISHES = [
  "Kashke Bademjan (Persian Eggplant Dip)",
  "Kabab Koobideh (Grilled Minced Lamb & Beef Skewers)",
  "Zereshk Polo ba Morgh (Saffron Chicken with Barberry Rice)",
  "Tahchin (Baked Saffron Rice Cake)",
].map(getDish);

export function SignatureDishesTeaser() {
  return (
    <section className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading icon="chef-hat" tone="amber">
              The menu
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              A taste of what we cook
            </h2>
          </Reveal>
          <Button variant="outline" size="md" href="/menu">
            See the full menu
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {SIGNATURE_DISHES.map((dish, i) => (
            <Reveal key={dish.name} delay={i * 90}>
              <div className="flex flex-col gap-4">
                {dish.photo ? <Photo src={dish.photo.src} alt={dish.name} ratio="3 / 4" /> : null}
                <h3 className="m-0 font-display text-h4 font-extrabold tracking-heading leading-snug text-green-800">
                  {dish.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
