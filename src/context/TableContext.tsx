import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DISHES } from "../data/dishes";

const STORAGE_KEY = "kookoo-table-v1";
const KNOWN = new Set(DISHES.map((d) => d.name));

interface TableValue {
  selected: string[];
  has: (name: string) => boolean;
  toggle: (name: string) => boolean;
  remove: (name: string) => void;
  clear: () => void;
  lastAction: string;
}

const TableContext = createContext<TableValue | null>(null);

function load(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n): n is string => typeof n === "string" && KNOWN.has(n)) : [];
  } catch {
    return [];
  }
}

export function TableProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>(load);
  const [lastAction, setLastAction] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // storage can be blocked (private mode); the table just won't persist
    }
  }, [selected]);

  const has = useCallback((name: string) => selected.includes(name), [selected]);

  // returns true when the dish was added (false when it was removed)
  const toggle = useCallback(
    (name: string) => {
      const adding = !selected.includes(name);
      setSelected((s) => (adding ? [...s, name] : s.filter((n) => n !== name)));
      setLastAction(adding ? `${name} added to your table` : `${name} removed from your table`);
      return adding;
    },
    [selected],
  );

  const remove = useCallback((name: string) => {
    setSelected((s) => s.filter((n) => n !== name));
    setLastAction(`${name} removed from your table`);
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
    setLastAction("Your table was cleared");
  }, []);

  const value = useMemo(
    () => ({ selected, has, toggle, remove, clear, lastAction }),
    [selected, has, toggle, remove, clear, lastAction],
  );

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function useTable(): TableValue {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("useTable must be used inside <TableProvider>");
  return ctx;
}
