import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-7F6hop_-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QuoteCtx = (0, import_react.createContext)(null);
var KEY_ITEMS = "devis-items";
var KEY_DATES = "devis-dates";
function QuoteProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)({});
	const [dates, setDatesState] = (0, import_react.useState)({
		start: "",
		end: ""
	});
	(0, import_react.useEffect)(() => {
		try {
			setItems(JSON.parse(localStorage.getItem(KEY_ITEMS) || "{}"));
			const stored = JSON.parse(localStorage.getItem(KEY_DATES) || "null");
			if (stored) setDatesState(stored);
		} catch {}
	}, []);
	const save = (next) => {
		setItems(next);
		localStorage.setItem(KEY_ITEMS, JSON.stringify(next));
	};
	const set = (slug, qty) => {
		const next = { ...items };
		if (qty <= 0) delete next[slug];
		else next[slug] = qty;
		save(next);
	};
	const add = (slug, qty = 1) => set(slug, (items[slug] || 0) + qty);
	const setDates = (d) => {
		setDatesState(d);
		localStorage.setItem(KEY_DATES, JSON.stringify(d));
	};
	const count = Object.values(items).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteCtx.Provider, {
		value: {
			items,
			add,
			set,
			clear: () => {
				save({});
				setDates({
					start: "",
					end: ""
				});
			},
			count,
			dates,
			setDates
		},
		children
	});
}
function useQuote() {
	const c = (0, import_react.useContext)(QuoteCtx);
	if (!c) throw new Error("useQuote outside provider");
	return c;
}
//#endregion
export { useQuote as n, QuoteProvider as t };
