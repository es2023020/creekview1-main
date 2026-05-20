# CreekView New Cairo

Marketing site for **CreekView by Mountain View** — TanStack Start, Supabase leads, deployed on **Vercel**.

## Stack

- **Framework:** TanStack Start + React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Backend:** Supabase (`public.leads` table)
- **Hosting:** Vercel (Nitro preset)
- **Analytics:** Vercel Analytics & Speed Insights (+ optional GA4)

## Local development

```bash
npm install
cp .env.example .env
# Edit .env with your Supabase keys and VITE_SITE_URL
npm run dev
```

Open http://localhost:5173

## Environment variables

| Variable | Required | Where |
|----------|----------|--------|
| `VITE_SUPABASE_URL` | Yes | Client — lead form |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Client — anon key |
| `VITE_SITE_URL` | Yes (prod) | Canonical URLs, sitemap, OG tags |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics 4 |

Set the same variables in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if needed).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run migrations in `supabase/migrations/` (SQL editor or CLI).
3. Confirm RLS on `leads`:
   - `anon` can **INSERT**
   - **SELECT** only for authenticated users (admin)
4. Copy **Project URL** and **anon public** key into Vercel env vars.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Other** (or TanStack Start if offered).
4. Build command: `npm run build`
5. Install command: `npm install`
6. Add env vars (see table above). Set `VITE_SITE_URL` to your production domain (e.g. `https://creekview.example.com`).
7. Enable **Web Analytics** and **Speed Insights** in the Vercel project dashboard (the app already includes `@vercel/analytics` and `@vercel/speed-insights`).
8. Deploy. The build outputs to `.vercel/output` (Nitro Vercel preset — detected automatically by Vercel).

`prebuild` regenerates `public/sitemap.xml` and `public/robots.txt` from `VITE_SITE_URL`.

### Removed (no longer used)

- Lovable config / Cloudflare Workers (`wrangler`, `@lovable.dev/vite-tanstack-config`)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build (Vercel) |
| `npm run preview` | Preview production build |
| `npm run seo:generate` | Regenerate sitemap/robots from `VITE_SITE_URL` |

## Project structure

```
src/
  routes/          # Pages (/, /units, /contact, …)
  components/      # UI + CreekView components
  data/            # Units, highlights, Mountain View data
  lib/seo.ts       # Meta tags & JSON-LD (not visible in UI)
  integrations/    # Supabase client
supabase/migrations/
public/            # robots.txt, sitemap.xml, og-default.jpg
```

## Contact & sales constants

Phone, email, WhatsApp: `src/components/creekview/SiteFooter.tsx`

## License

Private — Mountain View / CreekView sales project.
