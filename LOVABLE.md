# CreekView — Lovable deployment checklist

## Build status

- **Stack:** TanStack Start + Vite + Cloudflare Workers (`wrangler.jsonc` → `src/server.ts`)
- **Build:** `npm run build` (client + SSR worker)
- **Database:** Supabase (`leads` table + RLS)

## Before deploy in Lovable

### 1. Connect Supabase (Lovable Cloud)

Required environment variables (client):

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |

The lead form inserts into `public.leads`. Without these vars the contact page will error on submit.

### 2. Run database migrations

Apply all files in `supabase/migrations/` to your Supabase project (Lovable Cloud usually does this when linked):

- `leads` table with `interest_type`, `preferred_unit`, WhatsApp & callback fields
- RLS: **anon INSERT** allowed, **SELECT** for authenticated only

### 3. Domain & SEO

- Canonical / sitemap / Open Graph base URL: `https://creekview1.lovable.app`
- To change domain, update `SITE_URL` in `src/lib/seo.ts` and URLs in `public/sitemap.xml` + `public/robots.txt`
- Static SEO files: `public/robots.txt`, `public/sitemap.xml`, `public/og-default.jpg`
- Per-page meta + JSON-LD: `src/lib/seo.ts` (invisible in UI)

### 4. Unit images (optional)

Replace placeholders in `src/assets/units/` (see `src/assets/units/README.md`):

- `millennial-1br.jpg` — used for the combined Millennial card
- `skyvilla.jpg`, `ivilla.jpg`

### 5. Contact details

Sales phone/email/WhatsApp are in `src/components/creekview/SiteFooter.tsx` (`CONTACT_*` constants). Update there only.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/project` | Masterplan |
| `/units` | Millennial (one card, from EGP 5.4M), Sky Villa, I-Villa |
| `/mountain-view` | Developer |
| `/contact` | Lead form + tap-to-call/WhatsApp/email (no raw numbers in UI) |

Reserve-interest links use `#interest-form` on `/contact`.

## Scripts

```bash
npm install
npm run dev      # local: http://localhost:8080
npm run build    # production build
npm run lint     # ESLint
```

## Do not commit

- `.env` (secrets)
- `node_modules/`, `dist/`, `.wrangler/`

Use `.env.example` as a template.
