import "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { F as enUS, L as ar, P as fr } from "../_libs/date-fns.mjs";
require_react();
var DATE_LOCALES = {
	fr,
	en: enUS,
	ar
};
/** Langue à utiliser pour les dates (date-fns, calendrier). */
function useDateLocale() {
	const { i18n } = useTranslation();
	return DATE_LOCALES[i18n.language] ?? fr;
}
/** 
* Récupère le bon texte selon la langue (ex: name_ar, name_en, ou name par défaut)
*/
function getLocalizedField(item, field, lang) {
	if (!item) return "";
	if (lang === "ar" && item[`${field}_ar`]) return item[`${field}_ar`];
	if (lang === "en" && item[`${field}_en`]) return item[`${field}_en`];
	return item[field] || "";
}
//#endregion
export { useDateLocale as n, getLocalizedField as t };
