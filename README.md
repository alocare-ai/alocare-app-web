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

If you clone all repos side by side, `postinstall` uses the sibling folder automatically:

```bash
npm install
npm run dev
```

After design-system changes: `npm run sync-design-system` and commit `vendor/alocare-design-system`.

Set `NEXT_PUBLIC_API_URL` in `.env.local` (see `.env.example`).

## Deployment (Vercel)

The portal is deployed to **[app.alocare.net](https://app.alocare.net)** via Vercel.

| Setting | Value |
|---------|--------|
| Framework | Next.js |
| Build command | `npm run build` |
| Install command | `npm ci` |

Pushes to `main` on `alocare-ai/alocare-app-web` auto-deploy via Vercel Git integration. Add the custom domain `app.alocare.net` in Vercel (CNAME → `cname.vercel-dns.com`). See [alocare-tech-stack/deployment/app-web.md](../alocare-tech-stack/deployment/app-web.md).

| Environment variable | Production value |
|---------------------|------------------|
| `NEXT_PUBLIC_API_URL` | `https://api.alocare.net` |

```bash
npx vercel link    # first time
npx vercel git connect https://github.com/alocare-ai/alocare-app-web
npx vercel --prod  # manual deploy
```

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
