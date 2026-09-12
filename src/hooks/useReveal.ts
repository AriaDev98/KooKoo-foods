import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (revealed) return;
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
