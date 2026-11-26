# Design System — Portfolio V2

## 1. Color Tokens (`src/app/globals.css`)
### Light Theme (`:root`)
- Background: `#FFFFFF` (`--background`)
- Surface / Card / Secondary / Muted: `#F4F4F5` (`--card`, `--secondary`, `--muted`)
- Primary Text: `#18181B` (`--foreground`)
- Secondary Text: `#52525B` (`--muted-foreground`)
- Primary Accent: `#4F46E5` (`--primary`, `--accent`, `--ring`)
- Secondary Accent: `#7C3AED` (`--accent-secondary`)
- Border / Input: `#E4E4E7` (`--border`, `--input`)
- Destructive: `#DC2626` (`--destructive`)

### Dark Theme (`.dark`)
- Background: `#09090B` (`--background`)
- Surface / Card / Secondary / Muted: `#18181B` (`--card`, `--secondary`, `--muted`)
- Primary Text: `#FAFAFA` (`--foreground`)
- Secondary Text: `#A1A1AA` (`--muted-foreground`)
- Primary Accent: `#818CF8` (`--primary`, `--accent`, `--ring`)
- Secondary Accent: `#A78BFA` (`--accent-secondary`)
- Border / Input: `rgba(250, 250, 250, 0.1)` / `rgba(250, 250, 250, 0.14)`
- Destructive: `#EF4444` (`--destructive`)

## 2. Typography (`next/font/google`)
- **Sans (`--font-geist-sans`):** `Geist` — body copy, UI labels, controls
- **Heading (`--font-space-grotesk`):** `Space Grotesk` — `h1`, `h2`, `h3`, `h4`, card/sheet titles
- **Mono (`--font-geist-mono`):** `Geist Mono` — dates, status badges, technical metadata

## 3. Radii & Focus System
- Base `--radius: 0.75rem`, scaled across `--radius-sm` through `--radius-2xl`.
- Visible keyboard focus rings via `focus-visible:ring-2` / `focus-visible:ring-3` using `--ring` (`#4F46E5` light / `#818CF8` dark).
- Theme switching managed by `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`).

## 4. Motion, Surface & Ambient Effects (`src/config/motion.ts`, `src/app/globals.css`)
- **Spotlight & Gradient Borders:** `SpotlightCard` tracks `--spotlight-x` / `--spotlight-y` via pointer events using `color-mix(in oklch, var(--primary) 14%, transparent)` without per-frame React re-renders.
- **Ambient Grid & Aurora:** `.bg-engineering-grid` (`48px` grid lines mixed from `--border`) and `.animate-aurora` radial highlights using `--primary` and `--accent-secondary`.
- **Timing Tokens:** Micro-interactions (`0.18s`), UI transitions (`0.3s`), section reveals (`0.65s`), cinematic sequences (`0.95s`), stagger intervals (`0.045s`–`0.1s`).
- **Motion Accessibility:** Both `@media (prefers-reduced-motion: reduce)` and `[data-ambient-motion="paused"]` pause continuous CSS animations (`marquee-scroll`, `aurora-float`) alongside GSAP, Motion, Lenis, and Three.js fallbacks.
