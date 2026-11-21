import { FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { SITE } from "../../data/content";
import { useTable } from "../../context/TableContext";

export function WhatsAppFloat() {
  const { selected } = useTable();
  const [inEnquire, setInEnquire] = useState(false);

  // The enquiry section already has its own WhatsApp link in the "Find us"
  // card, and the table tray (same bottom-left corner on mobile) already
  // offers a direct path to the enquiry form once a visitor has picked
  // dishes — showing this too would just be clutter in both cases.
  useEffect(() => {
    const target = document.getElementById("enquire");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setInEnquire(entry.isIntersecting), { threshold: 0.2 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const visible = selected.length === 0 && !inEnquire;

  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      title="Message us on WhatsApp"
      className="fixed left-8 bottom-8 z-50 grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-12px_rgba(31,51,16,0.6)] transition-opacity duration-300 ease-standard hover:bg-[#1ebe5b]"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
