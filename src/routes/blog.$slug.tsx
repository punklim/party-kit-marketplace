import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any)
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data, error }: any) => {
        if (error || !data) {
          setLoading(false);
          throw notFound();
        }
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </SiteLayout>
    );
  }

  if (!post) {
    return (
      <SiteLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl mb-4">{t("blog.notFound")}</h1>
          <Link to="/blog" className="text-primary underline">{t("blog.backToList")}</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/blog" className="text-sm text-primary hover:underline flex items-center gap-1 mb-6">
          <ArrowLeft className="h-4 w-4" /> {t("blog.backToList")}
        </Link>
        
        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4">
          {new Date(post.created_at).toLocaleDateString(i18n.language, { day: "2-digit", month: "long", year: "numeric" })}
        </p>
        
        <h1 className="font-display text-4xl md:text-5xl text-zinc-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {post.cover_image && (
          <div className="aspect-video overflow-hidden rounded-sm mb-12">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-zinc-700 whitespace-pre-wrap">
          {post.content}
        </div>

        <div className="mt-16 pt-8 border-t">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            <ArrowLeft className="h-4 w-4" /> {t("blog.seeAll")}
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}