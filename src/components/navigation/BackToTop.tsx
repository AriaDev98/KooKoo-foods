import { useScrolled } from "../../hooks/useScrolled";

export function BackToTop() {
  const scrolled = useScrolled();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed right-8 bottom-8 z-50 grid h-[52px] w-[52px] place-items-center border-2 border-green-800 bg-cream-200 text-green-800 text-xl font-extrabold cursor-pointer shadow-[0_10px_30px_-12px_rgba(31,51,16,0.6)] transition-opacity duration-300 ease-standard hover:bg-amber-500"
      style={{
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}
