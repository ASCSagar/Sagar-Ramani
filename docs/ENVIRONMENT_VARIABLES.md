# Environment Variables Reference — Portfolio V2

This document details all environment variables supported by Portfolio V2 across development, preview, and production environments.

---

## 1. Environment Variable Summary Matrix

| Variable | Scope | Required? | Default / Fallback | Secret? |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | **Yes** | `http://localhost:3000` | No |
| `RESEND_API_KEY` | Server Only | Optional | Contact API returns `503` | **Yes** |
| `CONTACT_FROM_EMAIL` | Server Only | Optional | Contact API returns `503` | No |
| `CONTACT_TO_EMAIL` | Server Only | Optional | Contact API returns `503` | No |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client & Server | Optional | Turnstile widget hidden | No |
| `TURNSTILE_SECRET_KEY` | Server Only | Optional | Token verification bypassed | **Yes** |
| `UPSTASH_REDIS_REST_URL` | Server Only | Optional | In-memory sliding window rate limit | **Yes** |
| `UPSTASH_REDIS_REST_TOKEN` | Server Only | Optional | In-memory sliding window rate limit | **Yes** |

---

## 2. Variable Specifications

### `NEXT_PUBLIC_SITE_URL`
- **Description:** Fully qualified base URL of the website.
- **Used by:** `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, dynamic Open Graph / Twitter image generation.
- **Values:**
  - Local Dev: `http://localhost:3000`
  - Vercel Preview: `https://${VERCEL_URL}` or staging domain
  - Production: `https://sagarramani.dev`
- **Security:** Exposed to client bundle. Do not store sensitive parameters here.

### `RESEND_API_KEY`
- **Description:** API authentication token generated from the Resend dashboard.
- **Used by:** `src/app/api/contact/route.ts` via `new Resend(process.env.RESEND_API_KEY)`.
- **Security:** **Strictly Server-Only**. Must NEVER be prefixed with `NEXT_PUBLIC_` or logged to console/client.

### `CONTACT_FROM_EMAIL`
- **Description:** Verified sender email address configured on a verified domain in Resend.
- **Format:** `Sagar Ramani <contact@sagarramani.dev>` or `contact@sagarramani.dev`.
- **Constraint:** Must match a verified domain in the Resend account to avoid `403 Sender Domain Unverified`.

### `CONTACT_TO_EMAIL`
- **Description:** Destination inbox email address where visitor messages are forwarded.
- **Format:** `sagarramani@example.com` (personal verified mailbox).

### `NEXT_PUBLIC_TURNSTILE_SITE_KEY` & `TURNSTILE_SECRET_KEY`
- **Description:** Cloudflare Turnstile bot verification keys.
- **Behavior:**
  - If omitted: Contact form uses built-in hidden honeypot field (`website`) and IP rate limiting.
  - If configured: Contact form renders Turnstile widget; server validates token with Cloudflare `/siteverify`.

### `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`
- **Description:** Upstash Redis REST credentials for durable, distributed sliding-window rate limiting across multiple serverless instances.
- **Behavior:**
  - If configured: Rate limiting state is synchronized across edge/serverless nodes.
  - If omitted: Automatically falls back to an in-memory `Map` with periodic pruning.

---

## 3. Configuration Workflows

### Local Development (`.env.local`)
Create `.env.local` in the project root (this file is `.gitignore`d):
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel Deployment Settings
In Vercel Project Dashboard:
1. Go to **Settings** > **Environment Variables**.
2. Add each variable specifying the target environments (**Production**, **Preview**, **Development**).
3. Ensure server secrets are marked as **Sensitive**.
