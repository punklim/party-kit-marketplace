import { Link } from "@tanstack/react-router";
import { ShoppingBag, Phone, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { useQuote } from "@/lib/quote";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count } = useQuote();
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex justify-between">
          <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> +212 6 00 00 00 00</span>
          <span className="hidden sm:inline">Livraison & montage partout au Maroc</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-display text-3xl tracking-wide">Éclat<span className="text-primary">Events</span></Link>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/devis" className="relative flex items-center gap-2 rounded-sm bg-secondary text-secondary-foreground px-4 py-2.5 text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
            <ShoppingBag className="h-4 w-4" /> Devis
            {count > 0 && <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{count}</span>}
          </Link>
        </div>
        <nav className="md:hidden flex justify-center gap-5 pb-3 text-xs uppercase tracking-widest">
          {nav.map((n) => <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>)}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl">Éclat<span className="text-primary">Events</span></p>
            <p className="mt-4 text-sm opacity-70 max-w-xs">Location de matériel événementiel haut de gamme pour mariages, séminaires et réceptions.</p>
          </div>
          <div className="text-sm space-y-3 opacity-80">
            <p className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> Casablanca, Maroc</p>
            <p className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> +212 6 00 00 00 00</p>
            <p className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> contact@eclat-events.ma</p>
          </div>
          <div className="flex flex-col gap-2 text-sm uppercase tracking-widest">
            {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-primary">{n.label}</Link>)}
          </div>
        </div>
        <p className="text-center text-xs opacity-50 pb-6">© 2026 Éclat Events</p>
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-secondary text-secondary-foreground py-20 text-center">
      <p className="text-primary uppercase tracking-[0.3em] text-xs">Éclat Events</p>
      <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
      {subtitle && <p className="mt-4 opacity-70 max-w-xl mx-auto px-6">{subtitle}</p>}
    </section>
  );
}
