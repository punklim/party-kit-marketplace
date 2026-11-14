import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CookieBanner } from "../components/CookieBanner";
import { useTranslation } from "react-i18next";
import { Home, RotateCw } from "lucide-react";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { QuoteProvider } from "../lib/quote";
import { Toaster } from "../components/ui/sonner";
import { WhatsAppButton } from "../components/WhatsAppButton";
import "../locales/i18n";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] px-6 text-center">
      <div className="max-w-2xl">
        <p className="text-primary uppercase tracking-[0.35em] text-sm mb-6">Éclat Events</p>
        <h1 className="text-7xl md:text-9xl font-display text-secondary mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-display mb-4">
          {t("error.notFoundTitle")}
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          {t("error.notFoundText")}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Home className="h-4 w-4" />
            {t("error.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] px-6 text-center">
      <div className="max-w-2xl">
        <p className="text-primary uppercase tracking-[0.35em] text-sm mb-6">Éclat Events</p>
        <h2 className="text-3xl md:text-5xl font-display mb-4">
          {t("error.errorTitle")}
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          {t("error.errorText")}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-all duration-300"
          >
            <RotateCw className="h-4 w-4" />
            {t("error.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-secondary px-8 py-4 uppercase tracking-widest text-sm hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
          >
            <Home className="h-4 w-4" />
            {t("error.backHome")}
          </a>
        </div>

        {/* Détails techniques : affichés uniquement en développement */}
        {import.meta.env.DEV && error && error.message && (
          <details className="mt-12 text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground">{t("error.technicalDetails")}</summary>
            <pre className="mt-2 p-4 bg-black/5 rounded text-left overflow-auto max-w-full">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "google-site-verification", content: "kA1VTRgE3qiS6OOBIUp7VGv4KPOY2qIsVDE9RRiPJkA" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Éclat Events — Location de matériel événementiel au Maroc" },
      { name: "description", content: "Mobilier, tentes, sonorisation et art de la table en location pour vos mariages et événements au Maroc." },
      
      // Open Graph par défaut
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Éclat Events — Location de matériel événementiel" },
      { property: "og:description", content: "Mobilier, tentes, son & lumière en location partout au Maroc." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
      { property: "og:site_name", content: "Éclat Events" },
      { property: "og:locale", content: "fr_FR" },
      
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Éclat Events — Location de matériel événementiel" },
      { name: "twitter:description", content: "Mobilier, tentes, son & lumière en location partout au Maroc." },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&family=Karla:wght@400;500;600&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        <Outlet />
        <Toaster />
        <WhatsAppButton />
        <CookieBanner />
      </QuoteProvider>
    </QueryClientProvider>
  );
}