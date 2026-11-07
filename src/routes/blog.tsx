import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Éclat Events" },
      { name: "description", content: "Conseils, inspirations et actualités pour vos événements." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from("posts").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }: any) => {
      setPosts(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <SiteLayout>
      <PageHeader title="Notre Blog" subtitle="Conseils, inspirations et actualités" />
      
      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to="/blog/$slug" 
                params={{ slug: post.slug }} 
                className="group block bg-white border rounded-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {post.cover_image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                    {new Date(post.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                  <h2 className="font-display text-2xl text-zinc-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-600 line-clamp-3">
                    {post.excerpt || post.content.slice(0, 150) + "..."}
                  </p>
                  <p className="mt-4 text-sm text-primary font-medium">Lire la suite →</p>
                </div>
              </Link>
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                Aucun article pour le moment. Revenez bientôt !
              </div>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}