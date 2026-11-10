import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Éclat Events" },
      { name: "description", content: "Mentions légales du site Éclat Events, location de matériel événementiel au Maroc." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <SiteLayout>
      <PageHeader title="Mentions légales" subtitle="Informations légales concernant le site Éclat Events." />
      <section className="mx-auto max-w-4xl px-6 py-16 prose prose-lg">
        <h2 className="font-display text-3xl mt-8 mb-4">1. Éditeur du site</h2>
        <p className="mb-4">
          Le site <strong>party-kit-marketplace.vercel.app</strong> est édité par <strong>Éclat Events</strong>, SARL, au capital de 100 000 MAD, dont le siège social est situé à 45, Rue Al Mostakbal, Sidi Maarouf, Casablanca, Maroc.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Registre de Commerce (RC)</strong> : 123456</li>
          <li><strong>Identifiant Commun de l'Entreprise (ICE)</strong> : 001234567000089</li>
          <li><strong>Identifiant Fiscal (IF)</strong> : 12345678</li>
          <li><strong>Patente</strong> : 35789012</li>
          <li><strong>Téléphone</strong> : +212 6 91 05 55 97</li>
          <li><strong>Email</strong> : contact@eclat-events.ma</li>
        </ul>

        <h2 className="font-display text-3xl mt-8 mb-4">2. Directeur de la publication</h2>
        <p className="mb-4">
          Le directeur de la publication est <strong>Hamza Belrhouzi</strong>, en qualité de gérant.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">3. Hébergement</h2>
        <p className="mb-4">
          Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Site web : <a href="https://vercel.com" className="text-primary underline">https://vercel.com</a>.
        </p>
        <p className="mb-4">
          Les données (base de données, fichiers) sont stockées par <strong>Supabase Inc.</strong>, 970 Toa Payoh North #07-04, Singapour 318992. Site web : <a href="https://supabase.com" className="text-primary underline">https://supabase.com</a>.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">4. Propriété intellectuelle</h2>
        <p className="mb-4">
          L'ensemble des éléments constituant ce site (textes, images, logos, graphismes, structure) est la propriété exclusive d'Éclat Events, à l'exception des images libres de droits utilisées à titre illustratif. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, sans autorisation écrite préalable, est interdite et constituerait une contrefaçon au sens de la loi 17-97 relative à la protection de la propriété industrielle.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">5. Responsabilité</h2>
        <p className="mb-4">
          Les informations et annonces présentées sur ce site sont fournies à titre indicatif. Éclat Events s'efforce d'assurer l'exactitude des informations (prix, disponibilités, descriptions) mais ne peut garantir qu'elles soient exemptes d'erreurs. Les photographies des produits sont non contractuelles. Éclat Events ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">6. Liens externes</h2>
        <p className="mb-4">
          Le site peut contenir des liens vers des sites tiers (WhatsApp, réseaux sociaux, etc.). Éclat Events n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.
        </p>

        <h2 className="font-display text-3xl mt-8 mb-4">7. Droit applicable</h2>
        <p className="mb-4">
          Le présent site est soumis au droit marocain. Tout litige relatif à son utilisation sera soumis à la compétence des tribunaux de Casablanca.
        </p>

        <p className="mt-8 text-sm text-muted-foreground italic">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </section>
    </SiteLayout>
  );
}