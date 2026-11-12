import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

type BreadcrumbItem = {
  label: string;
  to?: string;
  params?: Record<string, string>;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {/* Accueil (toujours présent) */}
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="h-3 w-3" />
            {t("nav.home")}
          </Link>
        </li>

        {/* Éléments dynamiques */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3 opacity-50 rtl:rotate-180" />
            {item.to ? (
              <Link to={item.to} params={item.params} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}