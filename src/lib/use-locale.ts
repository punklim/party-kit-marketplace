import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ar, enUS, fr } from "date-fns/locale";
import type { Locale } from "date-fns";

const SUPPORTED_LANGUAGES = ["fr", "en", "ar"];
const LANGUAGE_STORAGE_KEY = "lng";

const DATE_LOCALES: Record<string, Locale> = { fr, en: enUS, ar };

/** Langue à utiliser pour les dates (date-fns, calendrier). */
export function useDateLocale(): Locale {
  const { i18n } = useTranslation();
  return DATE_LOCALES[i18n.language] ?? fr;
}

/** Direction du texte pour les composants qui en ont besoin (ex. calendrier). */
export function useTextDirection(): "ltr" | "rtl" {
  const { i18n } = useTranslation();
  return i18n.language === "ar" ? "rtl" : "ltr";
}

/**
 * Restaure la langue choisie lors d'une visite précédente.
 * À appeler une seule fois dans SiteLayout. Elle s'exécute après le premier rendu
 * pour rester identique au HTML envoyé par le serveur (pas d'erreur d'hydratation).
 */
export function useRestoreLanguage() {
  const { i18n } = useTranslation();
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && saved !== i18n.language && SUPPORTED_LANGUAGES.includes(saved)) {
        i18n.changeLanguage(saved);
      }
    } catch {
      // stockage indisponible : on garde la langue par défaut
    }
  }, [i18n]);
}
/** 
 * Récupère le bon texte selon la langue (ex: name_ar, name_en, ou name par défaut)
 */
export function getLocalizedField(item: any, field: string, lang: string) {
  if (!item) return "";
  if (lang === "ar" && item[`${field}_ar`]) return item[`${field}_ar`];
  if (lang === "en" && item[`${field}_en`]) return item[`${field}_en`];
  return item[field] || ""; // Retourne le français par défaut
}