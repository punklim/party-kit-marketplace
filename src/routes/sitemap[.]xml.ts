import { createFileRoute } from "@tanstack/react-router";
import { products, categories } from "@/data/catalog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const baseUrl = "https://party-kit-marketplace.vercel.app";
        const today = new Date().toISOString().split("T")[0];

        // Pages statiques
        const staticPages = [
          { path: "/", priority: "1.0" },
          { path: "/catalogue", priority: "0.9" },
          { path: "/realisations", priority: "0.8" },
          { path: "/blog", priority: "0.7" },
          { path: "/a-propos", priority: "0.6" },
          { path: "/contact", priority: "0.6" },
        ];

        // Pages par catégorie
        const categoryPages = categories.map((c) => ({
          path: `/catalogue/${c.slug}`,
          priority: "0.8",
        }));

        // Pages produit
        const productPages = products.map((p) => ({
          path: `/produit/${p.slug}`,
          priority: "0.7",
        }));

        const allPages = [...staticPages, ...categoryPages, ...productPages];

        const urls = allPages
          .map(
            (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});