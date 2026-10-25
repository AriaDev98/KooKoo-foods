import { Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { REVIEWS } from "../../data/reviews";
import { SITE } from "../../data/content";

function Stars() {
  return (
    <div className="flex gap-1 text-amber-500" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} strokeWidth={0} fill="currentColor" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading icon="star" tone="amber">
              What people say
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              Real words from real tables
            </h2>
          </Reveal>
          <Badge tone="amber">5.0★ on Google</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={(i % 3) * 90}>
              <Card tone={i % 2 === 1 ? "sage" : "cream"} bordered className="flex flex-col gap-4 h-full">
                <Stars />
                <p className="m-0 font-body text-body-md leading-relaxed text-green-700">
                  “{review.text}”
                </p>
                <p className="m-0 mt-auto font-ui text-body-sm font-bold text-green-800">
                  {review.name}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 font-body text-body-md text-green-700">
            <a
              href={SITE.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-bold text-green-800"
            >
              Read more reviews on Google
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
