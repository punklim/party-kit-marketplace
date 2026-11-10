import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Éclat Events" },
      { name: "description", content: "Réponses aux questions fréquentes sur la location de matériel événementiel au Maroc." },
    ],
  }),
  component: FAQ,
});

const questions = [
  {
    q: "Comment se passe la réservation ?",
    a: "Choisissez le produit, sélectionnez vos dates de location, remplissez vos coordonnées. Vous recevez immédiatement une référence de réservation. Notre équipe vous confirme la disponibilité sous 24h et vous contacte pour finaliser les détails et le paiement.",
  },
  {
    q: "Livrez-vous dans ma ville ?",
    a: "Oui, nous livrons dans tout le Maroc. Les frais de livraison varient selon la distance. Ils vous sont indiqués avant la validation de votre commande.",
  },
  {
    q: "Puis-je visiter le matériel avant de réserver ?",
    a: "Absolument. Contactez-nous par téléphone ou WhatsApp pour convenir d'un rendez-vous dans notre showroom à Casablanca.",
  },
  {
    q: "Que se passe-t-il en cas de casse ou de perte ?",
    a: "Le Client est responsable du matériel pendant la location. En cas de dommage ou de perte, des frais de remplacement ou de réparation vous seront facturés selon les conditions indiquées dans nos CGV.",
  },
  {
    q: "Quels sont les moyens de paiement acceptés ?",
    a: "Nous acceptons les espèces, les virements bancaires et les chèques. Un acompte peut être demandé à la confirmation de la réservation.",
  },
  {
    q: "Puis-je annuler ma réservation ?",
    a: "Oui. Les conditions d'annulation et de remboursement dépendent du délai avant l'événement (voir nos CGV). Contactez-nous au plus tôt pour minimiser les frais.",
  },
  {
    q: "Proposez-vous des packs pour mariages ou séminaires ?",
    a: "Oui, nous proposons des packs tout compris (mobilier, tentes, son, lumière) pour les mariages, séminaires et anniversaires. Contactez-nous pour un devis personnalisé.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteLayout>
      <PageHeader title="Questions fréquentes" subtitle="Tout ce qu'il faut savoir avant de louer votre matériel événementiel." />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border rounded-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left font-medium hover:bg-zinc-50"
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="p-5 pt-0 text-muted-foreground">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}