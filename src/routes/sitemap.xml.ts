import { createServerFileRoute } from "@tanstack/react-start/server";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://creekview1.vercel.app"
).replace(/\/$/, "");

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/project", priority: "0.9", changefreq: "monthly" },
  { path: "/units", priority: "0.95", changefreq: "weekly" },
  { path: "/mountain-view", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.85", changefreq: "monthly" },
  { path: "/faq", priority: "0.8", changefreq: "monthly" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${r.path}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${r.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${r.path}"/>
  </url>`
  )
  .join("\n")}
</urlset>`;

export const ServerRoute = createServerFileRoute("/sitemap.xml").methods({
  GET: () => {
    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  },
});
