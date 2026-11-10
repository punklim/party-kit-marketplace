import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente — Éclat Events" },
      { name: "description", content: "Conditions générales de vente et de location de matériel événementiel d'Éclat Events." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CGV,
});

function CGV() {
  return (
    <SiteLayout>
      <PageHeader title="Conditions Générales de Vente" subtitle="Règles applicables à toutes les réservations et locations." />
      <section className="mx-auto max-w-4xl px-6 py-16 prose prose-lg">
        <h2 className="font-display text-3xl mt-8 mb-4">1. Objet</h2>
        <p className="mb-4">
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Éclat Events (le "Loueur") et toute personne physique ou morale (le "Client") souhaitant louer du matériel événementiel via le site party-kit-marketplace.vercel.app.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">2. Commande et réservation</h2>
        <p className="mb-4">
          Le Client passe sa commande via le formulaire de devis ou de réservation du site. La réservation est considérée comme définitive après confirmation par email et versement de la caution mentionnée à l'article 5. Éclat Events se réserve le droit de refuser une réservation en cas d'indisponibilité du matériel ou de données incomplètes.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">3. Prix et paiement</h2>
        <p className="mb-4">
          Les prix sont indiqués en dirhams marocains (MAD), par jour et par unité. Le total affiché lors du devis inclut uniquement le prix de location. Les frais de livraison et de montage sont indiqués séparément avant validation. Le paiement s'effectue selon les modalités convenues avec l'agence (espèces, virement, chèque). Tout retard de paiement peut entraîner des pénalités.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">4. Livraison et montage</h2>
        <p className="mb-4">
          La livraison et le montage sont assurés par Éclat Events ou ses partenaires, dans les zones et délais convenus lors de la commande. Le Client doit être présent pour réceptionner le matériel et vérifier son état. Tout dommage constaté à la livraison doit être signalé immédiatement.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">5. Caution</h2>
        <p className="mb-4">
          Une caution peut être demandée avant la livraison. Elle est fixée en fonction de la valeur du matériel loué. La caution est restituée au Client dans un délai de 7 jours après le retour du matériel, déduction faite des éventuels dommages constatés.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">6. Annulation et modification</h2>
        <p className="mb-4">
          Toute annulation doit être notifiée par écrit. Les conditions de remboursement sont les suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Annulation à plus de 15 jours : remboursement intégral (hors caution).</li>
          <li>Annulation entre 7 et 15 jours : retenue de 30% du montant total.</li>
          <li>Annulation à moins de 7 jours : retenue de 50% du montant total.</li>
          <li>Annulation à moins de 48 heures : aucun remboursement.</li>
        </ul>

        <h2 className="font-display text-3xl mt-8 mb-4">7. Dégradations et pertes</h2>
        <p className="mb-4">
          Le Client est responsable du matériel loué pendant toute la durée de la location. En cas de casse, de perte ou de vol, le Client s'engage à indemniser Éclat Events à hauteur de la valeur du matériel endommagé ou perdu, telle qu'indiquée dans le contrat ou la facture.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">8. Obligations du Client</h2>
        <p className="mb-4">
          Le Client s'engage à utiliser le matériel conformément à sa destination et aux règles de sécurité, à ne pas le sous-louer et à le restituer dans l'état où il l'a reçu, à la date convenue.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">9. Force majeure</h2>
        <p className="mb-4">
          Éclat Events ne saurait être tenue responsable d'un retard ou d'une inexécution dus à un cas de force majeure (intempéries, grèves, décisions administratives, etc.).
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">10. Droit de rétractation</h2>
        <p className="mb-4">
          Conformément à la loi 31-08 relative à la protection du consommateur, le Client dispose d'un délai de 7 jours pour exercer son droit de rétractation pour toute commande à distance. Ce droit ne s'applique pas pour les prestations urgentes ou les locations à moins de 7 jours.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">11. Droit applicable et litiges</h2>
        <p className="mb-4">
          Les présentes CGV sont soumises au droit marocain. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux de Casablanca seront seuls compétents.
        </p>

        <p className="mt-8 text-sm text-muted-foreground italic">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </section>
    </SiteLayout>
  );
}