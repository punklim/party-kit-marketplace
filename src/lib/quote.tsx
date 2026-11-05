import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Items = Record<string, number>;
type Ctx = { items: Items; add: (slug: string, qty?: number) => void; set: (slug: string, qty: number) => void; clear: () => void; count: number };
const QuoteCtx = createContext<Ctx | null>(null);
const KEY = "devis-items";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>({});
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {}
  }, []);
  const save = (next: Items) => { setItems(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const set = (slug: string, qty: number) => {
    const next = { ...items };
    if (qty <= 0) delete next[slug]; else next[slug] = qty;
    save(next);
  };
  const add = (slug: string, qty = 1) => set(slug, (items[slug] || 0) + qty);
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return <QuoteCtx.Provider value={{ items, add, set, clear: () => save({}), count }}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote outside provider");
  return c;
}
