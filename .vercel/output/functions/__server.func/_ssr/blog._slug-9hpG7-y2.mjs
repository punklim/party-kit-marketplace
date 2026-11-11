import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { Y as notFound, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as ArrowLeft, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-BjHyiP9x.mjs";
import { t as Route } from "./blog._slug-Bsv892Rn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-9hpG7-y2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	const { slug } = Route.useParams();
	const [post, setPost] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single().then(({ data, error }) => {
			if (error || !data) {
				setLoading(false);
				throw notFound();
			}
			setPost(data);
			setLoading(false);
		});
	}, [slug]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	}) });
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl mb-4",
			children: "Article introuvable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog",
			className: "text-primary underline",
			children: "Retour au blog"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog",
				className: "text-sm text-primary hover:underline flex items-center gap-1 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Retour au blog"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-zinc-500 uppercase tracking-wider mb-4",
				children: new Date(post.created_at).toLocaleDateString("fr-FR", {
					day: "2-digit",
					month: "long",
					year: "numeric"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl text-zinc-900 mb-8 leading-tight",
				children: post.title
			}),
			post.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video overflow-hidden rounded-sm mb-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.cover_image,
					alt: post.title,
					className: "w-full h-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-lg max-w-none text-zinc-700 whitespace-pre-wrap",
				children: post.content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 pt-8 border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog",
					className: "inline-flex items-center gap-2 text-primary font-medium hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Voir tous les articles"]
				})
			})
		]
	}) });
}
//#endregion
export { BlogPostPage as component };
