# Deployment Guide — Portfolio V2

> **Repository:** `portfolio-v2`  
> **Target Platform:** Vercel (Next.js App Router Native Hosting)  
> **Node.js Runtime:** `v20.x` LTS  
> **Package Manager:** `pnpm` (`v12.23.0`)  
> **Canonical Domain:** `https://sagarramani.dev` (or approved custom domain)  

---

## 1. Architecture & Platform Overview

Portfolio V2 is built on the Next.js App Router with React 19, TypeScript, and Tailwind CSS v4. It is designed to deploy seamlessly to Vercel without requiring custom server containers or external runtime orchestration.

### Key Deployment Characteristics
- **Prerendered SSG / Static Core:** 60 routes (including all 14 published project case studies, dynamic Open Graph cards, Twitter cards, sitemap, and robots) are prerendered as static HTML/JSON assets.
- **On-Demand Dynamic Route Handler:** `/api/contact` runs as a lightweight edge-compatible Vercel Serverless Function handling contact form submissions, Zod validation, rate limiting, and email dispatch via Resend.
- **Zero Database Requirement:** Application state is entirely file-backed and statically verified via `src/data/*.ts`.

---

## 2. Vercel Project Setup & Configuration

### Automatic Git Integration (Recommended)
1. Push `portfolio-v2` to a private GitHub repository (`portfolio-v2`).
2. Log in to [Vercel Dashboard](https://vercel.com).
3. Click **Add New...** > **Project**.
4. Import `portfolio-v2`.
5. Vercel automatically detects **Next.js**.

### Build & Output Settings
| Setting | Value |
| --- | --- |
| **Framework Preset** | Next.js |
| **Root Directory** | `./` |
| **Build Command** | `pnpm build` (`next build --webpack`) |
| **Output Directory** | `.next` (default) |
| **Install Command** | `pnpm install --frozen-lockfile` |
| **Node.js Version** | `20.x` |

---

## 3. Environment Variables Configuration

Configure the following environment variables in Vercel under **Project Settings > Environment Variables**:

| Variable | Environment | Type | Purpose | Example / Note |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Public | Canonical URL, Open Graph, Sitemap | Production: `https://sagarramani.dev`<br>Preview: `https://$VERCEL_URL` |
| `RESEND_API_KEY` | Production, Preview | Secret | Resend API authentication for `/api/contact` | `re_xxxxxxxxxxxxxxxx` |
| `CONTACT_FROM_EMAIL` | Production, Preview | Secret | Verified sender email address | `contact@sagarramani.dev` |
| `CONTACT_TO_EMAIL` | Production, Preview | Secret | Destination email address for notifications | Personal verified address |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Public | Cloudflare Turnstile bot widget | `0x4AAAAAA...` |
| `TURNSTILE_SECRET_KEY` | Optional | Secret | Cloudflare Turnstile token validation | `0x4AAAAAA...` |
| `UPSTASH_REDIS_REST_URL` | Optional | Secret | Distributed rate limiting REST endpoint | `https://xxxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Secret | Upstash Redis REST bearer token | `AXxxxx...` |

> [!IMPORTANT]
> Never expose `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, or `UPSTASH_REDIS_REST_TOKEN` with the `NEXT_PUBLIC_` prefix.

---

## 4. Custom Domain & DNS Configuration

When deploying to the custom domain `sagarramani.dev`:

### 1. Add Domain in Vercel
In Vercel, navigate to **Project Settings > Domains**:
- Add `sagarramani.dev` (set as canonical)
- Add `www.sagarramani.dev` (configure automatic 308 redirect to `sagarramani.dev`)

### 2. Configure DNS Records with Domain Registrar / DNS Provider
| Type | Name / Host | Target / Value | TTL | Note |
| --- | --- | --- | --- | --- |
| `A` | `@` (apex) | `76.76.21.21` | Auto / 3600 | Vercel Anycast edge IP |
| `CNAME` | `www` | `cname.vercel-dns.com.` | Auto / 3600 | Vercel subdomain alias |

### 3. Verify SSL / TLS Certificate
Vercel automatically provisions and renews Let's Encrypt Wildcard SSL certificates for `sagarramani.dev` and `*.sagarramani.dev`.

---

## 5. Contact Email Integration (Resend Setup)

1. Sign up or log in to [Resend](https://resend.com).
2. Navigate to **Domains** > **Add Domain** (`sagarramani.dev`).
3. Add the required DNS records provided by Resend to your domain DNS:
   - `TXT` record for SPF (`v=spf1 include:amazonses.com ~all`)
   - `CNAME` records for DKIM (`resend._domainkey`)
   - `MX` record for inbound handling (if configured)
4. Once verified (green status), generate an API Key with **Sending access**.
5. Add the key and verified sender address (`contact@sagarramani.dev`) to Vercel Environment Variables.

---

## 6. Pre-Production Preview Verification

Before directing live domain traffic:
1. Trigger a Preview Deployment in Vercel via pull request or CLI (`vercel`).
2. Verify Preview URL:
   - Inspect all public routes (`/`, `/about`, `/experience`, `/projects`, `/skills`, `/education`, `/resume`, `/contact`).
   - Check mobile responsiveness on mobile viewports.
   - Test dark and light theme switching.
   - Verify that draft projects return HTTP 404.
   - Verify that résumé PDF download buttons are disabled (gated).
   - Test contact form submission (confirm graceful 503 or 200 delivery).

---

## 7. Rollback & Disaster Recovery Strategy

In the event of a production issue:

### Instant Vercel Rollback
1. Open **Vercel Dashboard > Deployments**.
2. Find the previous stable deployment.
3. Click the three dots (`...`) > **Rollback to this Deployment**.
4. Traffic is rerouted instantly (< 1 second) at the edge without a rebuild.

### Legacy V1 Preserved Fallback
- The legacy Portfolio V1 (`portfolio`) hosted on Netlify remains fully intact and operational.
- It will NOT be disabled or decommissioned until Phase 6 post-launch stabilization is explicitly confirmed.
- In an extreme emergency, DNS records can be temporarily pointed back to Netlify (`[project-name].netlify.app`).
