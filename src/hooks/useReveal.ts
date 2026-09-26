import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T | null>(null);
  // Always starts false, matching the prerendered HTML (no build-time visitor
  // to check prefers-reduced-motion for). Checked for real on mount instead —
  // CSS's own reduced-motion media query already suppresses the actual
  // animation regardless, so this is only about avoiding a hydration mismatch,
  // not a visible behavior change.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, revealed]);

  return { ref, revealed };
}
