# Product Requirements Document (PRD) — Portfolio V2

## 1. Product Vision
Portfolio V2 is a modern, high-craft rebuild of Sagar Ramani's developer portfolio using the Next.js App Router. It replaces the legacy Create React App (V1) portfolio with a scalable, accessible, Server-Component-first web application highlighting 4+ years of full-stack software engineering, enterprise SaaS delivery, and practical AI integrations.

## 2. Target Audience
- Engineering leaders, technical hiring managers, and prospective collaborators evaluating full-stack capabilities across React/Next.js, Node.js, Python/Django, GraphQL, and AI integration.
- Visitors browsing on desktop, tablet, and mobile devices, including users relying on keyboard navigation or reduced-motion preferences.

## 3. Core Functional Scope
### In Scope
- Approved routes: `/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/skills`, `/education`, `/resume`, `/contact`, and `not-found.tsx`.
- Dark, Light, and System themes with persistent preference via `next-themes`.
- Interactive Hero 3D Engineering Sphere prototype (`@react-three/fiber`) with graceful WebGL and reduced-motion fallbacks.
- Typed professional content modules (`src/data/*.ts`) with platform/module hierarchy (`TrueValue Platform`).
- Validated Contact Form (`POST /api/contact`) with Zod validation, honeypot spam guard, IP rate limiting, and Resend email delivery.
- Technical SEO (`metadataBase`, canonical URLs, `robots.ts`, `sitemap.ts`).

### Explicitly Out of Scope
- Blog or individual article publishing
- AI assistant / embedded chat widget
- Recruiter-specific view or gating
- Admin panel, CMS, authentication, user registration, database, or separate backend server

## 4. Honesty & Content Governance Requirements
- Never fabricate metrics, client outcomes, employment status, availability, notice periods, or salary expectations.
- Do not present `ETD` (`01 August 2025 – 31 October 2026`) as a current employer (`isCurrentEmployer: false`).
- Keep personal phone numbers hidden by default (`showPhoneNumber: false`) and never require visitor phone numbers.
- Keep testimonials disabled (`showTestimonials: false`) until explicit publication approval is verified.
- **[Pending Phase 3]:** Detailed case study narratives/screenshots for `pending-details` projects and verified downloadable résumé PDF.
