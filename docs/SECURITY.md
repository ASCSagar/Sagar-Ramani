# Security Architecture & Controls — Portfolio V2

## 1. Threat Model & Security Posture
Portfolio V2 is a high-performance Next.js App Router developer portfolio. Because developer portfolios are publicly accessible, they are frequent targets for:
- Automated bot spam and form abuse
- Distributed Denial of Service (DDoS) / API flooding
- Email header injection and relay abuse
- Cross-Site Scripting (XSS) and content injection
- Clickjacking and framing attacks
- Credential and environment variable leakage

The application follows defense-in-depth principles without requiring a full database or authentication system.

---

## 2. Contact API Protection (`POST /api/contact`)

### 2.1 Request Method & Content-Type Restriction
- **Allowed Methods:** `POST` only. All other HTTP methods (`GET`, `PUT`, `DELETE`, `PATCH`) return `405 Method Not Allowed` with `Allow: POST`.
- **Media Type Verification:** Requests must specify `Content-Type: application/json`. Non-JSON requests return `415 Unsupported Media Type`.

### 2.2 Payload Size Safeguards
- Payloads are restricted to a maximum of **32 KB** (`MAX_PAYLOAD_BYTES = 32 * 1024`).
- Checked both via `Content-Length` header and during raw request body streaming before parsing.
- Payloads exceeding 32 KB are rejected immediately with `413 Payload Too Large`.

### 2.3 Hybrid Sliding-Window Rate Limiting
- **Architecture (`src/lib/rate-limit.ts`):**
  - **Primary (Serverless Production):** Supports Upstash Redis REST API via `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` using `checkRateLimitAsync()`. Enables durable state across distributed Vercel serverless functions without maintaining persistent TCP connections.
  - **Secondary (Local & Fallback):** In-memory sliding window rate limiter keyed by client IP (`x-forwarded-for`, `x-real-ip`, or `127.0.0.1`). Features automatic periodic eviction of expired entries to prevent memory leaks in long-running processes.
- **Thresholds:** Maximum **5 submissions per 10-minute sliding window** per IP address.
- **Response:** Violations receive `429 Too Many Requests` along with a standardized `Retry-After: <seconds>` header.

### 2.4 Spam & Bot Protection
- **Honeypot Trap:** A hidden `website` field is rendered with `tabIndex={-1}`, `autoComplete="off"`, and `sr-only` styles. Human users cannot see or fill this field. Submissions containing a non-empty `website` value return a silent `200 OK` ("Enquiry received"), deceiving bots while aborting email delivery immediately.
- **Cloudflare Turnstile Support:** Optional zero-interaction bot protection verified via `TURNSTILE_SECRET_KEY` and client token (`turnstileToken`). If configured, unverified tokens return `403 Forbidden`.

### 2.5 Input Validation & Sanitization
- **Strict Zod Schema (`src/lib/validations/contact.ts`):**
  - `name`: 2 to 100 characters, trimmed.
  - `email`: 1 to 160 characters, verified against standard email grammar.
  - `company`: Optional, maximum 120 characters, trimmed.
  - `purpose`: Strictly constrained to approved enum (`Project Collaboration`, `Full-Time Role Discussion`, `Consulting / Architecture`, `General Enquiry`).
  - `message`: 10 to 3000 characters, trimmed.
- **Header Injection Prevention:**
  - `sanitizeHeaderValue()` strips CRLF characters (`\r`, `\n`) from all single-line header fields (`name`, `email`, `company`, `purpose`) to prevent SMTP header injection attacks.
- **XSS Prevention in Outgoing Emails:**
  - `escapeHtml()` converts `&`, `<`, `>`, `"`, and `'` into safe HTML entities before interpolating visitor input into Resend HTML templates.
  - Plain-text email alternative is generated simultaneously for email clients with HTML disabled.

### 2.6 Credential & Error Boundary Handling
- Missing Resend credentials (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) result in `503 Service Unavailable` with an honest visitor notice ("Contact service is temporarily unconfigured or unavailable").
- Upstream provider failures return `502 Bad Gateway`.
- Stack traces, internal service URLs, and raw exception messages are never exposed to clients.

---

## 3. HTTP Security Headers (`next.config.ts`)

Applied to all non-internal routes (`/(.*)`):

| Header | Configured Value | Protection Purpose |
| --- | --- | --- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com; connect-src 'self' https://vitals.vercel-insights.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests;` | Restricts script sources, prevents unauthorized asset execution, blocks iframing, enforces HTTPS. |
| `X-Frame-Options` | `DENY` | Prevents clickjacking by forbidding embedding in `<iframe>`, `<frame>`, `<embed>`, or `<object>`. |
| `X-Content-Type-Options` | `nosniff` | Prevents browser MIME-type sniffing attacks. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends full referrer to same-origin requests; sends origin only to secure cross-origin requests; sends nothing to insecure HTTP. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Disables sensitive hardware APIs and third-party advertising tracking. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS for 2 years across all subdomains with HSTS preload readiness. |

---

## 4. Environment Variable Security

### 4.1 Strict Variable Categorization
- **Client-Exposed (`NEXT_PUBLIC_*`):**
  - `NEXT_PUBLIC_SITE_URL`: Canonical site domain (`https://sagarramani.dev`).
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Public widget site key (optional).
- **Server-Only (Never Exposed to Client):**
  - `RESEND_API_KEY`: Secret transactional email API key.
  - `CONTACT_FROM_EMAIL`: Verified sender email address.
  - `CONTACT_TO_EMAIL`: Verified recipient mailbox.
  - `TURNSTILE_SECRET_KEY`: Secret Cloudflare bot verification key.
  - `UPSTASH_REDIS_REST_URL`: Distributed rate-limiting endpoint.
  - `UPSTASH_REDIS_REST_TOKEN`: Distributed rate-limiting REST token.

### 4.2 Hygiene & Repository Protection
- Real credentials and `.env.local` are explicitly ignored in `.gitignore` and never committed.
- `.env.example` documents mandatory and optional variables with clear descriptions and dummy formats.
- Server-side variables are accessed exclusively in Route Handlers (`src/app/api/contact/route.ts`).

---

## 5. Route Error Boundaries & Fallback Hardening
- **Root Error Boundary (`src/app/error.tsx`):** Traps unhandled React render errors, displays accessible user guidance, provides a reset button, and logs cleanly without revealing stack traces to visitors.
- **Global Error Boundary (`src/app/global-error.tsx`):** Standalone HTML shell fallback that handles root layout failures.
- **Custom 404 (`src/app/not-found.tsx`):** Accessible not-found page with clear navigation recovery links.
