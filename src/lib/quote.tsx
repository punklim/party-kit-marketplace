import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Items = Record<string, number>;
type Dates = { start: string; end: string };

type Ctx = {
  items: Items;
  add: (slug: string, qty?: number) => void;
  set: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  dates: Dates;
  setDates: (dates: Dates) => void;
};

const QuoteCtx = createContext<Ctx | null>(null);
const KEY_ITEMS = "devis-items";
const KEY_DATES = "devis-dates";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>({});
  const [dates, setDatesState] = useState<Dates>({ start: "", end: "" });

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY_ITEMS) || "{}"));
      const stored = JSON.parse(localStorage.getItem(KEY_DATES) || "null");
      if (stored) setDatesState(stored);
    } catch {}
  }, []);

  const save = (next: Items) => {
    setItems(next);
    localStorage.setItem(KEY_ITEMS, JSON.stringify(next));
  };

  const set = (slug: string, qty: number) => {
    const next = { ...items };
    if (qty <= 0) delete next[slug];
    else next[slug] = qty;
    save(next);
  };

  const add = (slug: string, qty = 1) => set(slug, (items[slug] || 0) + qty);

  const setDates = (d: Dates) => {
    setDatesState(d);
    localStorage.setItem(KEY_DATES, JSON.stringify(d));
  };

  const count = Object.values(items).reduce((a, b) => a + b, 0);

  return (
    <QuoteCtx.Provider
      value={{
        items,
        add,
        set,
        clear: () => {
          save({});
          setDates({ start: "", end: "" });
        },
        count,
        dates,
        setDates,
      }}
    >
      {children}
    </QuoteCtx.Provider>
  );
}

export function useQuote() {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote outside provider");
  return c;
}