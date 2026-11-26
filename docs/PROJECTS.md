# Projects Catalog Specification — Portfolio V2

> **Source of Truth:** `src/data/projects.ts` (`25` total records: `14` published entries, `11` draft records)

## 1. Grouping, Classification & Draft Governance
- `TrueValue Platform` (`kind: "platform"`) groups its 6 modules (`truevalue-crm`, `truevalue-appointments`, `truevalue-marketing`, `whatsapp-automation`, `truevalue-pbx`, `truevalue-siteflow`) via `parentPlatformSlug` and `moduleSlugs`.
- Entries distinguish `Enterprise Platform` (`platform`), `Standalone Product` (`application`), `Platform Module` (`module`), and `Supporting Service` (`service`).
- Top-level catalog (`getTopLevelProjects()`) displays `8` published top-level entries, while `generateStaticParams()` and `sitemap.ts` expose all `14` published slugs.
- `11` unverified records (`publicationStatus: "draft"`) are excluded from `/projects`, `generateStaticParams()`, and `sitemap.xml`, and return custom `404` on `/projects/[slug]`.

## 2. Inventory by Employer

### ETD (`10` Published Entries)
- **TrueValue Platform** (`truevalue-platform`, Featured, `platform`, `pending-details`) + **6 grouped modules** (`truevalue-crm`, `truevalue-appointments`, `truevalue-marketing`, `whatsapp-automation`, `truevalue-pbx`, `truevalue-siteflow`)
- **FlyOverseas.ai** (`flyoverseas-ai`, Featured, `application`, `pending-details`)
- **FlyOverseas Intelligent Chatbot** (`flyoverseas-intelligent-chatbot`, `module`, `pending-details`)
- **Automated Job Aggregation** (`automated-job-aggregation`, `service`, `pending-details`)

### Anant Soft Computing (`2` Published, `10` Draft)
- **Published (`overview`):** `study-streak` (Featured, live: `https://studystreak.in`), `tube-master` (Featured, live: `https://tubemastercrm.com`)
- **Draft (`publicationStatus: "draft"`):** `pawppy`, `makemyforte`, `baa`, `gazra`, `unplugwell`, `breatheoffline`, `theveganvibrance`, `techsnostalgia`, `fly-your-dreams`, `smhri`

### La Net Team (`2` Published, `1` Draft)
- **Published (`overview`):** `pabau` (Featured, live: `https://www.pabau.com/`), `jofo-salami-slicing` (live: `https://salamislicing.in`)
- **Draft (`publicationStatus: "draft"`):** `real-e-state` (Legacy portfolio item requiring verification prior to publication)

## 3. Pending Content
- Verified descriptions, architectures, technical challenges, responsibilities, and real product screenshots for `pending-details` and `draft` records. Conceptual system previews are displayed cleanly in place of missing screenshots.
