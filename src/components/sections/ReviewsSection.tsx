import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { REVIEWS, type ReviewItem } from "../../data/reviews";
import { SITE } from "../../data/content";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 40;

function Stars() {
  return (
    <div className="flex justify-center gap-1 text-amber-500" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} strokeWidth={0} fill="currentColor" />
      ))}
    </div>
  );
}

function ReviewBody({ review }: { review: ReviewItem }) {
  return (
    <>
      <Stars />
      <p className="mt-6 font-body text-body-lg leading-relaxed text-green-800 max-w-[42ch] mx-auto">
        {review.text}
      </p>
      <p className="mt-6 font-ui text-body-sm font-bold uppercase tracking-eyebrow text-green-600">
        {review.name}
      </p>
    </>
  );
}

const arrowButtonClass =
  "inline-flex items-center justify-center w-11 h-11 flex-none rounded-full border-2 border-green-800 text-green-800 transition-colors duration-150 ease-standard hover:bg-green-800 hover:text-cream-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber-500 focus-visible:outline-offset-2";

export function ReviewsSection() {
  const count = REVIEWS.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>();

  const go = useCallback((delta: number) => {
    setDirection(delta < 0 ? -1 : 1);
    setIndex((i) => (i + delta + count) % count);
  }, [count]);

  const navigate = (delta: number) => {
    setInteracted(true);
    go(delta);
  };

  const jumpTo = (i: number) => {
    setInteracted(true);
    setDirection(i < index ? -1 : 1);
    setIndex(i);
  };

  // Reviews vary a lot in length, so the card is locked to the tallest one
  // instead of resizing itself as the carousel steps through them — letting
  // the wrapper's own height track each review shifted the whole page below
  // it, including while idle during autoplay. Measured once against every
  // review's real text (re-measured on resize, since wrapping depends on
  // the card's width), via a hidden stack rendered at the same width.
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      let max = 0;
      for (const child of el.children) {
        max = Math.max(max, (child as HTMLElement).offsetHeight);
      }
      setContentHeight(max);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Gently rotates through reviews on its own, but a visitor taking the
  // wheel (hover, a click, a swipe) is always the last word — autoplay
  // never talks back over them.
  useEffect(() => {
    if (hovered || interacted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hovered, interacted, go]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    navigate(delta < 0 ? 1 : -1);
  };

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[760px] mx-auto text-center">
        <Reveal>
          <SectionHeading icon="star" tone="amber" align="center">
            What people say
          </SectionHeading>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
            Real words from real tables
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5 flex justify-center">
            <Badge tone="amber">4.9★ on Google</Badge>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            className="relative mt-12"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <div
              className="relative rounded-3xl bg-cream-200 shadow-[inset_0_0_0_1px_var(--color-cream-400)] px-8 py-12 sm:px-16 sm:py-16 select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Quote
                aria-hidden="true"
                size={48}
                strokeWidth={0}
                fill="currentColor"
                className="mx-auto text-amber-300"
              />
              <div
                className="reviews-height mt-4 overflow-hidden"
                style={{ height: contentHeight }}
                aria-live="polite"
                aria-atomic="true"
              >
                <div
                  key={index}
                  className={`h-full flex flex-col justify-center ${
                    direction === 1 ? "reviews-slide-next" : "reviews-slide-prev"
                  }`}
                >
                  <ReviewBody review={review} />
                </div>
              </div>

              <div
                ref={measureRef}
                aria-hidden="true"
                className="invisible absolute inset-x-8 sm:inset-x-16 top-0 -z-10 pointer-events-none"
              >
                {REVIEWS.map((r) => (
                  <div key={r.name}>
                    <ReviewBody review={r} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-8">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => navigate(-1)}
                className={arrowButtonClass}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-2">
                {REVIEWS.map((r, i) => (
                  <button
                    key={r.name}
                    type="button"
                    aria-label={`Show the review from ${r.name}`}
                    aria-current={i === index}
                    onClick={() => jumpTo(i)}
                    className={`h-[9px] rounded-full transition-all duration-200 ease-standard focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber-500 focus-visible:outline-offset-2 ${
                      i === index ? "w-7 bg-amber-500" : "w-[9px] bg-cream-400 hover:bg-amber-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next review"
                onClick={() => navigate(1)}
                className={arrowButtonClass}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
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
