import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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

function About() {
  const { t } = useTranslation();

  const stats = [
    ["10+", t("about.stat1")],
    ["1500+", t("about.stat2")],
    ["5000+", t("about.stat3")],
    ["12", t("about.stat4")],
  ];

  return (
    <SiteLayout>
      <PageHeader title={t("about.title")} subtitle={t("about.subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center">
        <img src={tentes} alt={t("about.title")} loading="lazy" className="w-full aspect-[4/5] object-cover" />
        <div>
          <h2 className="text-5xl">{t("about.knowHow")}</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.description")}</p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-5xl text-primary">{n}</p>
                <p className="text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}