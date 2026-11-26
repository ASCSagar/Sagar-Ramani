# Technical SEO & Metadata Architecture — Portfolio V2

## 1. Overview & Strategy
Portfolio V2 implements an enterprise technical SEO architecture using the Next.js Metadata API, dynamic Open Graph and Twitter image generation via Satori (`@vercel/og`), structured JSON-LD schemas, and verified sitemap and robots directives.

All metadata is centrally managed through `src/lib/seo.ts` to ensure consistency, eliminate code duplication, and enforce content honesty.

---

## 2. Centralized Metadata Engine (`src/lib/seo.ts`)

### 2.1 Metadata Builder Function
`buildPageMetadata()` provides a type-safe abstraction over Next.js `Metadata`:
- **Title Formatting:** Automatically formats titles with the site template (`%s | Sagar Ramani — Full Stack Software Developer`).
- **Canonical URLs:** Uses the production base URL `https://sagarramani.dev` without trailing slash confusion.
- **Open Graph Protocol:** Configures `og:title`, `og:description`, `og:url`, `og:siteName`, `og:locale` (`en_US`), and `og:type` (`website` or `article`).
- **Twitter Cards:** Configures `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, and `twitter:creator`.
- **Robots Directives:** Standardized `index: true`, `follow: true`, `googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }`.

### 2.2 Route-by-Route Metadata Configuration
| Route | Page Title | Meta Description Focus | Open Graph Type |
| --- | --- | --- | --- |
| `/` | Sagar Ramani — Full Stack Software Developer | 4+ years of full stack software engineering, scalable enterprise web applications, React, Next.js, Django, API architecture, and AI automation. | `website` |
| `/about` | About Sagar Ramani | Professional engineering philosophy, career trajectory, core technical specializations, and production craft. | `profile` |
| `/experience` | Work Experience & Employment History | Timeline across Valens Point, ETD, and Anant Soft Computing with calculated durations and key outcomes. | `website` |
| `/projects` | Engineering Projects & SaaS Platforms | Filterable catalog of 14 published enterprise platforms, SaaS applications, and developer tools. | `website` |
| `/projects/[slug]` | `[Project Title] — Case Study` | Problem statement, architectural decisions, technical stack, metrics, and key engineering takeaways. | `article` |
| `/skills` | Technical Skills & Capabilities | 9-category technical capability matrix across languages, frameworks, backend, databases, cloud, and tools. | `website` |
| `/education` | Education & Academic Background | Verified academic credentials from SVIT, Vasad and Nutan Vidyalaya. | `website` |
| `/resume` | Professional Résumé & Career Focus Tracks | Web résumé with 6 role-specific tracks and print-optimized layout. | `website` |
| `/contact` | Contact & Inquiries | Validated inquiry form for contract, consulting, architecture, and engineering discussions. | `website` |

---

## 3. Dynamic Social Cards & Favicons

All social cards and icons are generated dynamically at build/request time using Next.js Image Response APIs:

### 3.1 Root Open Graph & Twitter Cards
- **Files:** `src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx`
- **Dimensions:** 1200 × 630 pixels
- **Visual Design:** Dark background (`#09090B`), brand monogram badge (`SR`), name (`Sagar Ramani`), title (`Full Stack Software Developer`), experience highlight (`4+ Years Experience`), and key technical capability tags (`React & Next.js`, `Python & Django`, `Enterprise SaaS`, `API Architecture`).

### 3.2 Dynamic Case Study Cards
- **Files:** `src/app/projects/[slug]/opengraph-image.tsx` and `src/app/projects/[slug]/twitter-image.tsx`
- **Dimensions:** 1200 × 630 pixels
- **Dynamic Content:** Injects project name, client/employer, project category, and top technologies directly from `src/data/projects.ts`.

### 3.3 Dynamic App Monogram & Apple Icons
- **Files:** `src/app/icon.tsx` (32 × 32 PNG) and `src/app/apple-icon.tsx` (180 × 180 PNG)
- **Design:** Geometric rounded square with gradient border and stylized `SR` monogram.

---

## 4. Robots & Sitemap Directives

### 4.1 Robots Directives (`src/app/robots.ts`)
- **Route:** `GET /robots.txt`
- **Rules:**
  - `User-Agent: *`
  - `Allow: /`
  - `Disallow: /api/`
  - `Sitemap: https://sagarramani.dev/sitemap.xml`

### 4.2 Verified Sitemap (`src/app/sitemap.ts`)
- **Route:** `GET /sitemap.xml`
- **Published URLs (22 Total):**
  - 8 Static Routes: `/`, `/about`, `/experience`, `/projects`, `/skills`, `/education`, `/resume`, `/contact`
  - 14 Published Projects: `truevalue-platform`, `truevalue-crm`, `truevalue-appointments`, `truevalue-marketing`, `whatsapp-automation`, `truevalue-pbx`, `property-lead-aggregator`, `flyoverseas-ai`, `flyoverseas-chatbot`, `automated-job-aggregation`, `study-streak`, `tube-master`, `pabau-integration`, `jofo-salami-slicing`.
- **Exclusions:**
  - Strictly excludes all 11 unverified `draft` project records (`makemyforte`, `pawppy`, `real-e-state`, etc.).
  - Strictly excludes internal API endpoints (`/api/*`).
  - Strictly excludes error and 404 pages.
- **Modification Dates:** Configured with exact verified release date (`2026-11-25T00:00:00.000Z`) to avoid fabricated daily timestamps.

---

## 5. JSON-LD Structured Data Schemas

Implemented using `src/components/shared/json-ld.tsx`:

### 5.1 `Person` Schema (Root Layout)
- Discloses name, job title, canonical URL, professional photograph, and verified social profile links (`https://github.com/SagarIR`, `https://www.linkedin.com/in/sagar-ramani/`).
- Details known skills (`React`, `Next.js`, `TypeScript`, `Node.js`, `Python`, `Django`, `PostgreSQL`, `MongoDB`).

### 5.2 `WebSite` Schema (Root Layout)
- Discloses site name, URL, and author reference.

### 5.3 `SoftwareApplication` / `CreativeWork` Schema (Case Studies)
- Embedded on published project detail pages (`/projects/[slug]`).
- Discloses software title, description, application category, and operating requirements.

### 5.4 `BreadcrumbList` Schema (Case Studies)
- Establishes clear hierarchical navigation paths (`Home` -> `Projects` -> `[Parent Platform]` -> `[Project]`) for rich search results.
