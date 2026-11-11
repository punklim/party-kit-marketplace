import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-IXcm8bVZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("posts").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => {
			setPosts(data || []);
			setLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Notre Blog",
		subtitle: "Conseils, inspirations et actualités"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-6 py-16",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
			children: [posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog/$slug",
				params: { slug: post.slug },
				className: "group block bg-white border rounded-sm hover:shadow-lg transition-shadow overflow-hidden",
				children: [post.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.cover_image,
						alt: post.title,
						className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-500 uppercase tracking-wider mb-2",
							children: new Date(post.created_at).toLocaleDateString("fr-FR", {
								day: "2-digit",
								month: "long",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-zinc-900 mb-3 group-hover:text-primary transition-colors",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-600 line-clamp-3",
							children: post.excerpt || post.content.slice(0, 150) + "..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-primary font-medium",
							children: "Lire la suite →"
						})
					]
				})]
			}, post.id)), posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full text-center py-12 text-zinc-500",
				children: "Aucun article pour le moment. Revenez bientôt !"
			})]
		})
	})] });
}
//#endregion
export { BlogPage as component };
