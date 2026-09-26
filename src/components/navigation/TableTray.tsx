import { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, X } from "lucide-react";
import { useTable } from "../../context/TableContext";

export function TableTray() {
  const { selected, remove, clear, lastAction } = useTable();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [inEnquire, setInEnquire] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = selected.length;
  const visible = count > 0 && !inEnquire;

  useEffect(() => {
    if (count > 0) setBump((b) => b + 1);
  }, [count]);

  useEffect(() => {
    if (count === 0 || inEnquire) setOpen(false);
  }, [count, inEnquire]);

  // The enquiry form already lists the picked dishes, so the tray steps aside there.
  useEffect(() => {
    const target = document.getElementById("enquire");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setInEnquire(entry.isIntersecting), { threshold: 0.2 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goEnquire = () => {
    setOpen(false);
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={rootRef}
      className={`table-tray fixed z-[45] bottom-4 left-4 right-[84px] sm:bottom-8 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 ${visible ? "is-visible" : ""}`}
    >
      <span className="sr-only" role="status" aria-live="polite">
        {lastAction}
      </span>

      {open && visible ? (
        <div
          role="region"
          aria-label="Your table"
          className="table-tray-panel absolute bottom-[calc(100%+12px)] left-0 right-0 sm:left-1/2 sm:right-auto sm:w-[360px] sm:-translate-x-1/2 bg-cream-100 border-2 border-green-800 rounded-2xl shadow-[0_20px_50px_-16px_rgba(20,35,10,0.6)] p-4"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-display font-extrabold text-h4 text-green-800">Your table</span>
            <button
              type="button"
              onClick={clear}
              className="font-ui text-caption font-bold uppercase tracking-eyebrow text-green-600 hover:text-clay-700 cursor-pointer"
            >
              Clear all
            </button>
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-1 max-h-[38vh] overflow-auto">
            {selected.map((name) => (
              <li key={name} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 bg-cream-200">
                <span className="font-body text-body-md text-green-800">{name}</span>
                <button
                  type="button"
                  onClick={() => remove(name)}
                  aria-label={`Remove ${name}`}
                  className="grid place-items-center h-7 w-7 rounded-full text-green-700 hover:bg-amber-500 hover:text-green-800 cursor-pointer"
                >
                  <X size={15} strokeWidth={2.6} />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={goEnquire}
            className="mt-4 w-full rounded-control bg-amber-500 px-5 py-3 font-ui text-body-md font-bold text-green-800 hover:bg-amber-400 cursor-pointer"
          >
            Enquire with these dishes
          </button>
        </div>
      ) : null}

      <div className="flex items-center gap-2 rounded-full bg-green-800 py-2 pl-2 pr-2 text-cream-100 shadow-[0_16px_40px_-14px_rgba(15,28,8,0.8)] border border-green-600">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-3 rounded-full py-1 pl-2 pr-3 font-ui text-body-md font-bold cursor-pointer hover:bg-green-700 transition-colors"
        >
          <span
            id="table-tray-count"
            key={bump}
            // The prerendered HTML always bakes in 0 (no build-time visitor to read
            // localStorage from). A returning visitor's real count differs on their
            // very first client render, which is expected, not a bug — this just
            // tells React to take the client's value instead of warning about it.
            suppressHydrationWarning
            className="table-tray-count grid h-8 w-8 place-items-center rounded-full bg-amber-500 text-green-800 text-body-md font-extrabold"
          >
            {count}
          </span>
          <UtensilsCrossed size={18} strokeWidth={2.2} className="hidden sm:block text-amber-400" aria-hidden="true" />
          <span className="whitespace-nowrap">Your table</span>
        </button>
        <button
          type="button"
          onClick={goEnquire}
          className="ml-auto rounded-full bg-amber-500 px-4 py-2 font-ui text-body-sm font-bold text-green-800 hover:bg-amber-400 cursor-pointer whitespace-nowrap"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
