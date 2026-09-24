import { useEffect, useRef, type CSSProperties } from "react";

interface Plate {
  src: string;
  style: CSSProperties;
  depth: number;
  float: number;
  enter: number;
  hideOnMobile?: boolean;
}

const size = (min: number, vw: number, max: number) => `clamp(${min}px, ${vw}vw, ${max}px)`;

const PLATES: Plate[] = [
  { src: "koofteh-tomato", style: { left: "3%", top: "13%", width: size(60, 13, 200) }, depth: 22, float: 7.5, enter: 500 },
  { src: "barberry-rice-full", style: { left: "16%", top: "55%", width: size(46, 9, 140) }, depth: 34, float: 6.2, enter: 750, hideOnMobile: true },
  { src: "dolmeh-cabbage", style: { left: "1%", top: "66%", width: size(52, 10, 150) }, depth: 14, float: 8.4, enter: 950 },
  { src: "persian-sweets-tray2", style: { right: "3%", top: "12%", width: size(56, 12, 180) }, depth: 26, float: 6.8, enter: 600 },
  { src: "koobideh", style: { right: "15%", top: "57%", width: size(46, 9, 140) }, depth: 36, float: 7.1, enter: 850, hideOnMobile: true },
  { src: "barbari-homemade", style: { right: "1%", top: "64%", width: size(52, 10.5, 156) }, depth: 16, float: 8, enter: 1050 },
];

// Deterministic so server/client and every reload agree — no Math.random in render.
const THREADS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 8) % 97}%`,
  height: 10 + ((i * 7) % 9),
  duration: 15 + ((i * 5) % 12),
  delay: -((i * 3.1) % 20),
  sway: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 3) % 18)),
  spin: 25 + ((i * 11) % 60),
}));

const STEAM = [
  { left: "38%", delay: 0, duration: 9 },
  { left: "50%", delay: -3.2, duration: 11 },
  { left: "61%", delay: -6, duration: 10 },
];

// Decorative only: sits between the hero's living background and its text.
// Everything here is transform/opacity so it stays on the compositor, and it
// pauses itself whenever the hero is off-screen.
export function HeroFoodScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!el || !hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let sy = 0;

    const tick = () => {
      raf = 0;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", sy.toFixed(3));
      if (Math.abs(tx - mx) > 0.002 || Math.abs(ty - my) > 0.002) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!finePointer) return;
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      sy = Math.max(0, Math.min(1, -r.top / r.height));
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(hero);

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-scene" aria-hidden="true" data-paused="false">
      {STEAM.map((s, i) => (
        <span
          key={i}
          className="hero-steam"
          style={{ left: s.left, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
        />
      ))}

      {THREADS.map((t, i) => (
        <span
          key={i}
          className="hero-thread"
          style={
            {
              left: t.left,
              height: `${t.height}px`,
              animationDuration: `${t.duration}s`,
              animationDelay: `${t.delay}s`,
              "--sway": `${t.sway}px`,
              "--spin": `${t.spin}deg`,
            } as CSSProperties
          }
        />
      ))}

      {PLATES.map((p) => (
        <div
          key={p.src}
          className={`hero-plate ${p.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{ ...p.style, "--depth": p.depth } as CSSProperties}
        >
          <div
            className="hero-plate-float"
            style={{ "--float": `${p.float}s`, "--enter": `${p.enter}ms` } as CSSProperties}
          >
            <img src={`/images/hero/${p.src}.jpg`} alt="" width={380} height={380} decoding="async" />
          </div>
        </div>
      ))}
    </div>
  );
}
