# Deploy app.alocare.net on Vercel

Next.js clinician and patient portal (`alocare-app-web`).

## Automatic deployments (Git)

The Vercel project should be connected to **GitHub** (`alocare-ai/alocare-app-web`).

| Event | Vercel behavior |
|-------|-----------------|
| Push to `main` | **Production** deployment |
| Pull request | **Preview** deployment |

No manual deploy is required after Git integration is connected. Each push to `main` runs `npm ci` (installs vendored `@alocare/design-system`), then `next build`.

To connect or reconnect locally:

```bash
npx vercel login
npx vercel link --yes
npx vercel git connect https://github.com/alocare-ai/alocare-app-web
```

## Vercel project settings

| Setting | Value |
|---------|--------|
| Repository | `alocare-ai/alocare-app-web` |
| Framework Preset | **Next.js** |
| Build Command | `npm run build` |
| Output Directory | *(Next.js default — leave empty)* |
| Install Command | `npm ci` |
| Root Directory | `.` |

These match `vercel.json` in the repo root.

## Environment variables

In Vercel → Project → **Settings** → **Environment Variables**:

| Variable | Production | Preview (optional) |
|----------|------------|------------------|
| `NEXT_PUBLIC_API_URL` | `https://api.alocare.net` | `https://api.alocare.net` or staging API |

Do **not** rely on `.env` in the repo on Vercel — `generate-env` is skipped in CI. Set variables in the Vercel dashboard.

`@alocare/design-system` is vendored under `vendor/alocare-design-system` (`file:` dependency). No `GITHUB_TOKEN` is required for Vercel builds. After changing the design system, run `npm run sync-design-system` and commit `vendor/`.

## 1. Create the Vercel project

1. Open [vercel.com/new](https://vercel.com/new) and import **alocare-ai/alocare-app-web**, or run `npx vercel link --yes`.
2. Confirm framework **Next.js** and build settings (table above).
3. Add `NEXT_PUBLIC_API_URL` (see above).
4. Deploy once. Every subsequent push to `main` triggers a production deployment.

## 2. Add custom domain `app.alocare.net`

In Vercel → Project → **Settings** → **Domains**:

1. Add `app.alocare.net`.
2. Copy the DNS record Vercel shows (usually a CNAME).

## 3. DNS (Cloudflare)

In Cloudflare → **alocare.net** → **DNS** → **Records**:

Vercel may recommend either:

```txt
A      app  76.76.21.21
```

or:

```txt
CNAME  app  cname.vercel-dns.com
```

Use **DNS only** (grey cloud) until Vercel shows the domain as verified, then enable proxy if you want Cloudflare in front.

Other Alocare sites on separate Vercel projects:

| Host | Repository |
|------|------------|
| `alocare.net` / `www` | `alocare-ai/alocare-web` |
| `design.alocare.net` | `alocare-ai/alocare-design-system` |
| `app.alocare.net` | `alocare-ai/alocare-app-web` |

## 4. CLI deploy (optional)

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

## Troubleshooting

- **`npm ci` exit 128 / Permission denied (publickey)** — do not use git/SSH for `@alocare/design-system`; use the committed `vendor/alocare-design-system` copy.
- **Build fails on `@alocare/design-system`** — run `npm run sync-design-system` from a built sibling `alocare-design-system`, commit `vendor/`, and redeploy.
- **Stale UI (e.g. 96% confidence inside Review & Validate)** — run `npm run sync-design-system`, commit vendor, **Redeploy → Clear build cache**.
- **API calls fail in production** — set `NEXT_PUBLIC_API_URL` in Vercel; ensure `api.alocare.net` allows CORS from `app.alocare.net`.
- **Login works locally but not on Vercel** — cookies require HTTPS in production; confirm domain matches and API is the same environment you logged in against.
- **Domain not verifying** — remove conflicting `app` records; CNAME must point to Vercel only.
