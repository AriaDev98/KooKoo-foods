import { useEffect } from "react";
import { rememberSource, trackContactClicks } from "../../utils/attribution";

// Renders nothing: on the client it remembers where the visitor came from
// and counts taps on WhatsApp / phone / email links as goals.
export function ConversionTracking() {
  useEffect(() => {
    rememberSource();
    return trackContactClicks();
  }, []);
  return null;
}
