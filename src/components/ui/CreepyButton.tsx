import { useRef, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type Coords = { x: number; y: number };

interface CommonProps {
  children: ReactNode;
  className?: string;
  coverClassName?: string;
}

type CreepyButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

// A CTA with two small eyes hiding behind the label that track the cursor
// and peek out when the cover tilts on hover/focus. The tilt and blink are
// plain CSS (transition + the .creepy-eye keyframe in index.css) rather than
// a motion library, to match the rest of the site's dependency-free approach.
export function CreepyButton({ children, className = "", coverClassName = "", href, ...rest }: CreepyButtonProps) {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });

  const updateEyes = (e: MouseEvent) => {
    if (!eyesRef.current) return;
    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = { x: eyesRect.left + eyesRect.width / 2, y: eyesRect.top + eyesRect.height / 2 };
    const dx = e.clientX - eyesCenter.x;
    const dy = e.clientY - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    const visionRangeX = 180;
    const visionRangeY = 75;
    const distance = Math.hypot(dx, dy);

    setEyeCoords({
      x: (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX,
      y: (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY,
    });
  };

  const resetEyes = () => setEyeCoords({ x: 0, y: 0 });

  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
  };

  const classes = [
    "group relative inline-flex min-w-[9em] text-body-md rounded-control bg-green-800 cursor-pointer outline-none select-none no-underline",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const coverClasses = [
    "absolute inset-0 flex items-center justify-center rounded-control bg-amber-500 text-green-800",
    "font-marker font-bold uppercase tracking-marker px-[1.6em] py-[0.85em]",
    "shadow-[inset_0_0_0_2px_var(--color-green-800)]",
    "origin-[1.25em_50%] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
    "group-hover:-rotate-12 group-focus-visible:-rotate-12",
    coverClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {/* Eyes, hidden behind the cover until it tilts */}
      <span
        ref={eyesRef}
        aria-hidden="true"
        className="absolute flex items-center gap-[0.375em] right-[1.1em] bottom-[0.6em] h-[0.75em] z-0 pointer-events-none"
      >
        <span className="creepy-eye relative w-[0.75em] bg-cream-100 rounded-full overflow-hidden">
          <span
            className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-green-900 rounded-full transition-transform duration-75 ease-out"
            style={pupilStyle}
          />
        </span>
        <span className="creepy-eye relative w-[0.75em] bg-cream-100 rounded-full overflow-hidden">
          <span
            className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-green-900 rounded-full transition-transform duration-75 ease-out"
            style={pupilStyle}
          />
        </span>
      </span>

      <span className={coverClasses}>{children}</span>

      {/* Invisible placeholder — the cover is absolutely positioned, so this reserves the button's real size */}
      <span className="invisible block font-marker font-bold uppercase tracking-marker px-[1.6em] py-[0.85em]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseMove={updateEyes}
        onMouseLeave={resetEyes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onMouseMove={updateEyes}
      onMouseLeave={resetEyes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
