import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function loadDotEnv() {
  const path = join(process.cwd(), ".env");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnv();

const site = (process.env.VITE_SITE_URL || "https://your-domain.vercel.app").replace(
  /\/$/,
  "",
);

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/project", priority: "0.9", changefreq: "monthly" },
  { path: "/units", priority: "0.95", changefreq: "weekly" },
  { path: "/mountain-view", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.85", changefreq: "monthly" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${site}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `# CreekView New Cairo
User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), sitemap);
writeFileSync(join(process.cwd(), "public", "robots.txt"), robots);
console.log(`[seo] Generated sitemap & robots for ${site}`);
