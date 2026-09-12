import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

/**
 * Fades a photo up into place the first time it scrolls into view. Pass
 * `delay` (ms) to stagger siblings in a grid. `h-full` keeps the wrapper
 * transparent to CSS Grid's default row-stretch, so inserting it never
 * changes the grid's layout.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`h-full ${className}`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 700ms var(--ease-standard), transform 700ms var(--ease-standard)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
