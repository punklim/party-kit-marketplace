import { createFileRoute } from "@tanstack/react-router";
import tentes from "@/assets/tentes.jpg";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Éclat Events" },
      { name: "description", content: "Découvrez Éclat Events, spécialiste de la location de matériel événementiel au Maroc." },
      { property: "og:title", content: "À propos — Éclat Events" },
      { property: "og:description", content: "Notre histoire et notre savoir-faire." },
    ],
  }),
  component: About,
});

const stats = [["10+", "ans d'expérience"], ["1500+", "événements"], ["5000+", "articles en stock"], ["12", "villes desservies"]];

function About() {
  return (
    <SiteLayout>
      <PageHeader title="À propos" subtitle="La passion du détail au service de vos plus beaux moments" />
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center">
        <img src={tentes} alt="Chapiteau illuminé" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        <div>
          <h2 className="text-5xl">Notre savoir-faire</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">Depuis plus de dix ans, Éclat Events accompagne particuliers, agences et entreprises dans l'organisation de leurs événements. Notre parc de matériel est entretenu avec soin et nos équipes assurent livraison, montage et démontage.</p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            {stats.map(([n, l]) => <div key={l}><p className="font-display text-5xl text-primary">{n}</p><p className="text-sm text-muted-foreground">{l}</p></div>)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
