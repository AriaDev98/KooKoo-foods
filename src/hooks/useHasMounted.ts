import { useEffect, useState } from "react";

// Server/prerendered HTML never knows a visitor's client-only state (e.g.
// localStorage). Components whose structure (not just text) depends on that
// state should gate on this and render the server's empty-state shape until
// it flips true, then re-render with the real client state a tick later —
// avoiding a hydration mismatch rather than fighting it after the fact.
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
