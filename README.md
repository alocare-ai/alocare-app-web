# alocare-app-web

Clinician and patient portal for **Alocare AI** — upload reports, review AI analysis, chat, consultations, and enterprise workflows.

Built with Next.js 15, React 19, Tailwind v4, and `@alocare/design-system`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Monorepo checkout (sibling `alocare-design-system`)

If you clone all repos side by side, link the local design system instead of GitHub:

```bash
npm install ../alocare-design-system
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` (see `.env.example`).

## Deploy to Vercel (auto-deploy on push)

Same flow as [alocare-web](https://github.com/alocare-ai/alocare-web):

1. Push this repo to GitHub (`alocare-ai/alocare-app-web`).
2. In [Vercel](https://vercel.com), **Add New Project** → import `alocare-ai/alocare-app-web`.
3. Framework: **Next.js** (auto-detected). Root directory: `.` — click **Deploy**.
4. Vercel deploys automatically on every push to `main`.

`vercel.json` enables production deployments from the `main` branch. `@alocare/design-system` is installed from GitHub and built during `postinstall` on Vercel.

### Environment variables (Vercel project → Settings → Environment Variables)

| Variable | Production value |
|----------|------------------|
| `NEXT_PUBLIC_API_URL` | `https://api.alocare.net` |

Apply to **Production**, **Preview**, and **Development** as needed.

## Point `app.alocare.net` to Vercel

In **Vercel** (project → **Settings** → **Domains**):

1. Add `app.alocare.net`
2. Copy the DNS record Vercel shows (often a CNAME to `cname.vercel-dns.com`)

In **Cloudflare** (or your DNS host) for `alocare.net`:

```txt
CNAME  app  cname.vercel-dns.com
```

Use **DNS only** (grey cloud) until Vercel shows the domain as verified, then enable proxy if you use Cloudflare CDN.

The marketing site (`alocare.net`) stays on the separate **alocare-web** Vercel project.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server (webpack) |
| `npm run dev:turbo` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run setup` | Generate `.env` from example + git identity |

## Architecture

- Browser → `app.alocare.net` (this app) → `/api/auth/*` and `/api/backend/*` BFF routes → `api.alocare.net`
- JWT in httpOnly cookies (`alocare_access_token`, `alocare_refresh_token`)
- AI/OCR runs on **alocare-api** and **alocare-ai-engine**, not in the browser
