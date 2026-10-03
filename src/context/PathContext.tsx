import { createContext, useContext } from "react";

// Set once per page, identically on the server (passed into render(path) in
// entry-server.tsx) and the client (read from window.location.pathname in
// entry-client.tsx), so nav active-states never mismatch during hydration.
export const PathContext = createContext<string>("/");

export const useCurrentPath = () => useContext(PathContext);

export function isNavActive(href: string, currentPath: string): boolean {
  const base = href.split("#")[0] || "/";
  return base === currentPath;
}
