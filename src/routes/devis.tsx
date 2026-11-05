import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { formatPrice, products } from "@/data/catalog";
import { useQuote } from "@/lib/quote";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Mon devis — Éclat Events" },
      { name: "description", content: "Finalisez votre sélection de matériel et envoyez votre demande de devis." },
      { property: "og:title", content: "Mon devis — Éclat Events" },
      { property: "og:description", content: "Envoyez votre demande de devis de location." },
    ],
  }),
  component: Devis,
});

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function Devis() {
  const { items, set, clear } = useQuote();
  const [sent, setSent] = useState(false);
  const lines = Object.entries(items).map(([slug, qty]) => ({ p: products.find((x) => x.slug === slug)!, qty })).filter((l) => l.p);
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  if (sent)
    return (
      <SiteLayout>
        <PageHeader title="Merci !" subtitle="Votre demande a bien été envoyée. Nous vous répondons sous 24h." />
        <div className="text-center py-16"><Link to="/catalogue" className="uppercase tracking-widest text-sm text-primary">Retour au catalogue</Link></div>
      </SiteLayout>
    );

  return (
    <SiteLayout>
      <PageHeader title="Mon devis" subtitle="Vérifiez votre sélection et indiquez les détails de votre événement" />
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div>
          {lines.length === 0 ? (
            <div className="border p-12 text-center">
              <p className="text-muted-foreground">Votre devis est vide.</p>
              <Link to="/catalogue" className="inline-block mt-6 bg-secondary text-secondary-foreground px-6 py-3 uppercase tracking-widest text-sm">Parcourir le catalogue</Link>
            </div>
          ) : (
            <div className="divide-y border">
              {lines.map(({ p, qty }) => (
                <div key={p.slug} className="flex items-center gap-4 p-4">
                  <img src={p.image} alt={p.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1"><p className="font-display text-xl">{p.name}</p><p className="text-sm text-muted-foreground">{formatPrice(p.price)} / unité</p></div>
                  <input type="number" min={1} value={qty} onChange={(e) => set(p.slug, +e.target.value)} className="w-20 border bg-card px-2 py-2 text-center" aria-label="Quantité" />
                  <button onClick={() => set(p.slug, 0)} aria-label="Retirer" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <div className="p-4 flex justify-between font-semibold"><span>Total estimé / jour</span><span>{formatPrice(total)}</span></div>
            </div>
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); clear(); setSent(true); }} className="bg-muted p-8 space-y-4 h-fit">
          <h2 className="text-3xl">Vos informations</h2>
          <input required placeholder="Nom complet" className={field} />
          <input required type="tel" placeholder="Téléphone" className={field} />
          <input required type="email" placeholder="Email" className={field} />
          <div className="grid grid-cols-2 gap-3">
            <input required type="date" className={field} aria-label="Date de l'événement" />
            <input placeholder="Ville" className={field} />
          </div>
          <select className={field} defaultValue=""><option value="" disabled>Type d'événement</option><option>Mariage</option><option>Séminaire</option><option>Anniversaire</option><option>Autre</option></select>
          <textarea rows={4} placeholder="Message" className={field} />
          <button disabled={lines.length === 0} className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm disabled:opacity-50">Envoyer ma demande</button>
        </form>
      </section>
    </SiteLayout>
  );
}
