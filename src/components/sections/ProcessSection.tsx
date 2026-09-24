import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { PROCESS_STEPS } from "../../data/content";

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Where each photo swap happens along the pinned scroll (0..1).
const SWAP_1 = [0.3, 0.46] as const;
const SWAP_2 = [0.64, 0.8] as const;
// Scroll positions the step buttons jump to.
const STEP_TARGETS = [0.08, 0.55, 0.95];

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function StaticProcess() {
  return (
    <section id="process" className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <Reveal>
            <SectionHeading icon="chef-hat" tone="clay">
              Made by hand
            </SectionHeading>
            <h2 className="mt-6 font-display text-h2 font-extrabold tracking-heading leading-tight text-green-800">
              The process of baking auchma
            </h2>
          </Reveal>
          <p className="m-0 font-body text-lead leading-relaxed text-green-700 max-w-[32em]">
            Every auchma is rolled, brushed and sprinkled by hand at the FoodLab kitchen on the morning
            of your event — never frozen, never bought in.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {PROCESS_STEPS.map((step, i) => (
            <figure key={step.n} className="m-0 flex flex-col gap-5">
              <Reveal delay={(i % 3) * 90}>
                <Photo src={step.src} alt={step.label} ratio="3 / 4" />
              </Reveal>
              <figcaption className="flex gap-4 items-baseline">
                <span className="font-marker text-h4 leading-none text-clay-500">{step.n}</span>
                <span className="font-body text-body-lg leading-relaxed text-green-500">{step.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pinned scene: the section is tall, its content sticks to the viewport, and the
// scroll position drives which photo is showing — the dough goes from egg wash,
// to sesame, to golden and baked. Visitors who prefer reduced motion get the
// original static three-photo layout instead.
function PinnedProcess() {
  const outerRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const scene = sceneRef.current;
    if (!outer || !scene) return;

    let raf = 0;
    let lastActive = -1;

    const update = () => {
      raf = 0;
      const rect = outer.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp(total > 0 ? -rect.top / total : 0);
      const r1 = ease(clamp((p - SWAP_1[0]) / (SWAP_1[1] - SWAP_1[0])));
      const r2 = ease(clamp((p - SWAP_2[0]) / (SWAP_2[1] - SWAP_2[0])));
      scene.style.setProperty("--p", p.toFixed(4));
      scene.style.setProperty("--r1", r1.toFixed(4));
      scene.style.setProperty("--r2", r2.toFixed(4));
      const next = r2 > 0.5 ? 2 : r1 > 0.5 ? 1 : 0;
      if (next !== lastActive) {
        lastActive = next;
        setActive(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const top = outer.getBoundingClientRect().top + window.scrollY;
    const total = outer.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * STEP_TARGETS[i], behavior: "smooth" });
  };

  return (
    <section
      id="process"
      ref={outerRef}
      className="process-pin relative bg-cream-100 border-t border-cream-400"
      aria-label="How your auchma is made"
    >
      <div className="process-sticky sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={sceneRef}
          className="process-scene mx-auto flex h-full max-w-[1180px] flex-col gap-4 px-6 pt-[84px] pb-6 sm:px-10 lg:grid lg:grid-cols-[1fr_minmax(0,auto)] lg:items-center lg:gap-16 lg:pt-[72px]"
        >
          <div className="flex min-w-0 flex-col gap-4 lg:gap-8">
            <div>
              <SectionHeading icon="chef-hat" tone="clay">
                Made by hand
              </SectionHeading>
              <h2 className="mt-4 font-display text-h3 font-extrabold tracking-heading leading-tight text-green-800 lg:mt-6 lg:text-h2">
                The process of baking auchma
              </h2>
              <p className="m-0 mt-5 hidden max-w-[30em] font-body text-lead leading-relaxed text-green-700 lg:block">
                Every auchma is rolled, brushed and sprinkled by hand at the FoodLab kitchen on the
                morning of your event — never frozen, never bought in.
              </p>
            </div>

            <ol className="process-steps relative m-0 hidden list-none p-0 lg:flex lg:flex-col lg:gap-1">
              <span className="process-rail" aria-hidden="true">
                <span className="process-rail-fill" />
              </span>
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active === i ? "step" : undefined}
                    className={`process-step flex w-full cursor-pointer items-baseline gap-5 rounded-xl py-3 pl-7 pr-4 text-left transition-opacity duration-300 ${active === i ? "is-active" : ""}`}
                  >
                    <span className="font-marker text-h4 leading-none text-clay-500">{step.n}</span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-h4 font-extrabold leading-snug tracking-heading text-green-800">
                        {sentence(step.label)}
                      </span>
                      <span className="font-body text-body-md leading-relaxed text-green-500">{step.caption}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 lg:flex-none">
            <div className="process-stage relative">
              {PROCESS_STEPS.map((step, i) => (
                <img
                  key={step.n}
                  src={step.src}
                  alt={i === active ? step.label : ""}
                  aria-hidden={i === active ? undefined : true}
                  loading="lazy"
                  decoding="async"
                  className={`process-img process-img-${i}`}
                />
              ))}
              <div className="process-badge" aria-hidden="true">
                <span className="font-marker">{PROCESS_STEPS[active].n}</span>
                <span key={active} className="process-badge-text">
                  {sentence(PROCESS_STEPS[active].label)}
                </span>
              </div>
              <div className="process-hint" aria-hidden="true">
                <span className="process-hint-dot" />
                Scroll
              </div>
            </div>

            <div className="lg:hidden" aria-live="polite">
              <p key={active} className="process-mobile-caption m-0 min-h-[2.9em] text-center font-body text-body-lg leading-snug text-green-700">
                {PROCESS_STEPS[active].caption}
              </p>
              <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
                {PROCESS_STEPS.map((step, i) => (
                  <span key={step.n} className={`process-dot ${active === i ? "is-active" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticProcess /> : <PinnedProcess />;
}
