import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";

const CARDS = [
  {
    icon: "utensils" as const,
    title: "Set menus",
    desc: "Pick a full spread from the menu, or build your own dish by dish. Nothing is fixed.",
  },
  {
    icon: "leaf" as const,
    title: "Dietary needs",
    desc: "Vegetarian, vegan and gluten-free dishes are on the menu. Tell us what you need and we will adjust.",
  },
  {
    icon: "users" as const,
    title: "Any size table",
    desc: "Six people at home or two hundred at a hall — the food is cooked fresh either way.",
  },
];

export function IntroSection() {
  return (
    <section className="bg-cream-200 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="max-w-[34em]">
          <SectionHeading icon="cooking-pot" tone="amber">
            Catering for events and parties
          </SectionHeading>
          <div className="font-body text-lead leading-relaxed text-green-700 mt-8 space-y-6">
            <p className="m-0">
              Kookoo Foods is a <b className="font-bold">home kitchen</b> working out of{" "}
              <b className="font-bold">FoodLab Strathfield South</b>. Everything is cooked to order —
              saffron, herbs and slow work, the way it is done at home.
            </p>
            <p className="m-0">
              We cook for <b className="font-bold">weddings</b>, <b className="font-bold">birthdays</b>,
              office lunches and quiet family tables, anywhere across{" "}
              <b className="font-bold">New South Wales</b>.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {CARDS.map((c) => (
            <Card key={c.title} tone="cream" bordered>
              <SectionHeading icon={c.icon} tone="green" color="green">
                {c.title}
              </SectionHeading>
              <p className="mt-5 font-body text-body-md leading-relaxed text-green-700">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
