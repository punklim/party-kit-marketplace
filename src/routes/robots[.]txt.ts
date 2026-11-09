import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /devis
Disallow: /mes-reservations
Disallow: /avis
Disallow: /api/

Sitemap: https://party-kit-marketplace.vercel.app/sitemap.xml
`;
        return new Response(content, {
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});