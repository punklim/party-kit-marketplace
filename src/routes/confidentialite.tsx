import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Éclat Events" },
      { name: "description", content: "Comment Éclat Events collecte et protège vos données personnelles, conformément à la loi 09-08." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Confidentialite,
});

function Confidentialite() {
  return (
    <SiteLayout>
      <PageHeader title="Politique de confidentialité" subtitle="Protection de vos données personnelles (loi 09-08)." />
      <section className="mx-auto max-w-4xl px-6 py-16 prose prose-lg">
        <h2 className="font-display text-3xl mt-8 mb-4">1. Responsable du traitement</h2>
        <p className="mb-4">
          Le responsable du traitement des données collectées sur ce site est <strong>Éclat Events</strong>, dont le siège est situé à 45, Rue Al Mostakbal, Sidi Maarouf, Casablanca, Maroc. Contact : contact@eclat-events.ma.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">2. Données collectées</h2>
        <p className="mb-4">
          Nous collectons les données que vous nous transmettez volontairement via nos formulaires :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Formulaire de contact / devis</strong> : nom, téléphone, email, ville, type d'événement, message.</li>
          <li><strong>Formulaire de réservation</strong> : nom, email, téléphone, dates de location.</li>
          <li><strong>Newsletter</strong> : adresse email.</li>
          <li><strong>Avis client</strong> : nom, rôle, note, commentaire.</li>
        </ul>
        <p className="mb-4">
          Aucune donnée sensible (santé, religion, opinions politiques, etc.) n'est collectée.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">3. Finalités du traitement</h2>
        <p className="mb-4">Vos données sont utilisées uniquement pour :</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Répondre à vos demandes de devis et de contact.</li>
          <li>Gérer vos réservations de matériel.</li>
          <li>Vous envoyer la newsletter (si vous y avez consenti).</li>
          <li>Publier vos avis sur le site (après validation).</li>
          <li>Améliorer nos services et la qualité de notre site.</li>
        </ul>
        <p className="mb-4">
          Vos données ne sont <strong>jamais vendues</strong> ni cédées à des tiers à des fins commerciales.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">4. Destinataires des données</h2>
        <p className="mb-4">
          Vos données peuvent être transmises aux prestataires techniques suivants, dans le cadre strict de l'exécution de nos services :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Supabase Inc.</strong> (hébergement de la base de données).</li>
          <li><strong>Vercel Inc.</strong> (hébergement du site).</li>
          <li><strong>Resend</strong> (envoi des emails de confirmation et de devis).</li>
        </ul>
        <p className="mb-4">
          Certains de ces prestataires sont situés en dehors du Maroc. Conformément à la loi 09-08, ce transfert à l'étranger est encadré et déclaré à la CNDP.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">5. Durée de conservation</h2>
        <p className="mb-4">
          Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis pendant 3 ans à compter du dernier contact, conformément aux obligations légales et comptables. Les données de newsletter sont conservées jusqu'à votre désinscription.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">6. Vos droits</h2>
        <p className="mb-4">
          Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Droit d'accès à vos données.</li>
          <li>Droit de rectification.</li>
          <li>Droit d'opposition.</li>
          <li>Droit de suppression (dans les limites légales).</li>
        </ul>
        <p className="mb-4">
          Pour exercer ces droits, contactez-nous à : <strong>contact@eclat-events.ma</strong> ou par courrier à 45, Rue Al Mostakbal, Sidi Maarouf, Casablanca, Maroc.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">7. Déclaration CNDP</h2>
        <p className="mb-4">
          Ce site a fait l'objet d'une déclaration à la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP). Numéro de récépissé : 1234/2026.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">8. Cookies</h2>
        <p className="mb-4">
          Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement (session, sécurité des formulaires, choix de la langue). Il n'utilise pas de cookies publicitaires ou de suivi. Si nous ajoutons un outil de mesure d'audience à l'avenir, nous mettrons à jour cette page et afficherons un bandeau de consentement.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">9. Sécurité</h2>
        <p className="mb-4">
          Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre l'accès non autorisé, la perte ou l'altération (chiffrement SSL, accès restreint à la base de données, politique de mots de passe forts).
        </p>

        <p className="mt-8 text-sm text-muted-foreground italic">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </section>
    </SiteLayout>
  );
}