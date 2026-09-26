import { useRef } from "react";
import { Check, Plus } from "lucide-react";
import { useTable } from "../../context/TableContext";
import { useHasMounted } from "../../hooks/useHasMounted";

// A small amber dot that flies from the button to the tray, so adding a dish
// feels like dropping it onto the table. Skipped for reduced-motion users.
function flyToTray(from: DOMRect) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = document.getElementById("table-tray-count")?.getBoundingClientRect();
  const endX = target ? target.left + target.width / 2 : window.innerWidth / 2;
  const endY = target ? target.top + target.height / 2 : window.innerHeight - 40;
  const startX = from.left + from.width / 2;
  const startY = from.top + from.height / 2;

  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${startX - 9}px`,
    top: `${startY - 9}px`,
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#d69a1f",
    boxShadow: "0 0 0 4px rgba(214,154,31,0.35), 0 8px 18px rgba(0,0,0,0.35)",
    pointerEvents: "none",
    zIndex: "80",
  });
  document.body.appendChild(dot);

  const dx = endX - startX;
  const dy = endY - startY;
  const lift = -Math.min(120, Math.abs(dy) * 0.3 + 40);
  const anim = dot.animate(
    [
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 + lift}px) scale(1.15)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.35)`, opacity: 0.4 },
    ],
    { duration: 700, easing: "cubic-bezier(0.32, 0.72, 0.28, 1)" },
  );
  anim.onfinish = () => dot.remove();
  anim.oncancel = () => dot.remove();
}

export function AddToTable({
  name,
  collapsed = false,
  className = "",
}: {
  name: string;
  /** Show only the icon until hover/focus (used over photos). */
  collapsed?: boolean;
  className?: string;
}) {
  const { has, toggle } = useTable();
  const ref = useRef<HTMLButtonElement>(null);
  // Prerendered HTML always shows "not added" (no build-time visitor to read
  // localStorage from). Gating on mounted keeps the client's very first render
  // matching that, so a returning visitor's real state applies a tick later
  // instead of causing a hydration mismatch on the icon/label/class here.
  const mounted = useHasMounted();
  const added = mounted && has(name);

  const onClick = () => {
    const adding = toggle(name);
    if (adding && ref.current) flyToTray(ref.current.getBoundingClientRect());
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-pressed={added}
      aria-label={added ? `Remove ${name} from my table` : `Add ${name} to my table`}
      className={`add-to-table ${added ? "is-added" : ""} ${collapsed ? "is-collapsed" : ""} ${className}`}
    >
      <span className="add-to-table-icon" aria-hidden="true">
        {added ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
      </span>
      <span className="add-to-table-label">{added ? "On my table" : "Add to my table"}</span>
    </button>
  );
}
