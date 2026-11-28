import { pageview } from "@vercel/analytics";

// Where did this visitor come from? Remembered from their first visit (for
// 30 days) so an enquiry sent on a later visit still credits the channel
// that brought them here. Nothing personal is stored: just the channel name.
const KEY = "kk_source";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredSource {
  label: string;
  at: number;
}

function labelFromReferrer(referrer: string): string {
  if (!referrer) return "Direct (typed or saved link)";
  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Other website";
  }
  if (host === location.hostname.replace(/^www\./, "")) return "";
  if (/(^|\.)google\./.test(host)) return "Google";
  if (/instagram\.com$/.test(host)) return "Instagram";
  if (/(facebook\.com|fb\.me|fb\.com)$/.test(host)) return "Facebook";
  if (/(youtube\.com|youtu\.be)$/.test(host)) return "YouTube";
  if (/bing\.com$/.test(host)) return "Bing";
  if (/(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai)$/.test(host)) return `AI assistant (${host})`;
  return host;
}

function currentLabel(): string {
  const params = new URLSearchParams(location.search);
  const src = params.get("utm_source");
  if (src) {
    const medium = params.get("utm_medium");
    if (src === "google" && medium === "gbp_post") return "Google Business post";
    if (src === "google" && medium === "gbp") return "Google Business Profile";
    return medium ? `${src} / ${medium}` : src;
  }
  return labelFromReferrer(document.referrer);
}

/** Call once on page load: records the first-touch source if none is stored yet. */
export function rememberSource(): void {
  try {
    const now = Date.now();
    const stored = JSON.parse(localStorage.getItem(KEY) || "null") as StoredSource | null;
    if (stored && now - stored.at < MAX_AGE_MS) return;
    const label = currentLabel();
    if (label) localStorage.setItem(KEY, JSON.stringify({ label, at: now } satisfies StoredSource));
  } catch {
    // Storage blocked (private mode etc.): getSource() falls back to this visit.
  }
}

/** The channel to credit for an enquiry, e.g. "Instagram" or "Google Business post". */
export function getSource(): string {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || "null") as StoredSource | null;
    if (stored?.label) return stored.label;
  } catch {
    // fall through
  }
  return currentLabel() || "Unknown";
}

export type Goal = "enquiry-sent" | "whatsapp-click" | "phone-click" | "email-click";

// Vercel Web Analytics on the Hobby plan doesn't show custom events, but it
// does count page views, so each conversion is recorded as a virtual page
// view under /goal/... — visible in the Pages panel, and filtering on one
// shows its referrers and countries.
export function trackGoal(goal: Goal): void {
  try {
    pageview({ route: `/goal/${goal}`, path: `/goal/${goal}` });
  } catch {
    // analytics must never break the page
  }
}

/** Document-level listener so every WhatsApp / phone / email link counts, wherever it sits. */
export function trackContactClicks(): () => void {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("https://wa.me/")) trackGoal("whatsapp-click");
    else if (href.startsWith("tel:")) trackGoal("phone-click");
    else if (href.startsWith("mailto:")) trackGoal("email-click");
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
