/** Public site URL — set VITE_SITE_URL in Vercel (e.g. https://creekview.example.com). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "http://localhost:5173"
).replace(/\/$/, "");
