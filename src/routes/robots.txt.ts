import { createServerFileRoute } from "@tanstack/react-start/server";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://creekview1.vercel.app"
).replace(/\/$/, "");

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

export const ServerRoute = createServerFileRoute("/robots.txt").methods({
  GET: () => {
    return new Response(robots, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  },
});
