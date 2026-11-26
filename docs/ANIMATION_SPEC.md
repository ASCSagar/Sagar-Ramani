# Animation Specification — Portfolio V2

## 1. Strict Separation of Concerns
| Engine | Responsibility | Location |
| --- | --- | --- |
| **Lenis (`lenis/react`)** | Global smooth wheel scrolling synced to `gsap.ticker` (`options={{ autoRaf: false }}`) as a sibling in `AnimationProvider` (with dialog/sheet scroll prevention) | `src/components/providers/animation-provider.tsx` |
| **GSAP + `@gsap/react`** | `Preloader`, `SplitTextReveal` (`SplitText`), `ScrollReveal`, `StaggerReveal`, `MaskReveal`, `ParallaxImage`, `AnimatedCounter`, `MagneticButton`, `CustomCursor` (`quickTo`), `HorizontalProjectShowcase` (desktop pinned scrub), `AnimatedExperienceTimeline` (scrubbed vertical line + staggered milestones) | `src/lib/gsap.ts`, `src/components/animations/*`, `src/components/sections/*`, `src/components/experience/*` |
| **Motion (`motion/react`)** | `PageTransition` (opacity-only so GSAP `ScrollTrigger` pinning is never offset by an ancestor transform), `ScrollProgress`, `SiteHeader` active pill (`layoutId`), mobile drawer navigation, `ProjectsCatalog` & `SkillsMatrix` layout filtering, `ResumeCenter` & `ContactForm` state transitions, `TechnologyOrbit` interactive rotation | `src/components/animations/page-transition.tsx`, `src/components/layout/site-header.tsx`, `src/components/effects/technology-orbit.tsx` |
| **Three.js / R3F** | Single continuous interactive 3D `EngineeringSphere` (`HeroScene`) + custom shader `ParticleField` + `SceneLighting` | `src/components/three/*` |
| **CSS / Tailwind v4** | `SpotlightCard`, `TiltCard`, `AmbientBackground` (grid + aurora drift), `TechnologyMarquee` GPU keyframe streams, focus rings, `@media (prefers-reduced-motion: reduce)`, `[data-ambient-motion="paused"]` | `src/app/globals.css`, `src/components/effects/*` |

## 2. Centralized Motion Design System (`src/config/motion.ts`)
- **Durations:** `micro` (`0.18s`), `ui` (`0.3s`), `reveal` (`0.65s`), `cinematic` (`0.95s`), `counter` (`1.1s`), `preloader` (`0.65s`).
- **Staggers:** `tight` (`0.045s`), `base` (`0.075s`), `relaxed` (`0.1s`).
- **Distances:** `sm` (`12px`), `md` (`22px`), `lg` (`36px`).
- **ScrollTrigger Defaults:** `start: "top 86%"`, `once: true`, `invalidateOnRefresh: true`.
- **Quality Presets (`THREE_QUALITY_PRESETS`):** `desktop`, `tablet`, `mobile`, `reduced` controlling `dpr`, `particleCount`, geometry tessellation, network edge generation, and rotation speed.

## 3. Lifecycle, Accessibility & Conflict Prevention Rules
- Never animate the same CSS property (`transform`, `opacity`) on the same element with both GSAP and Motion or CSS transitions simultaneously.
- Never place `transform` or `will-change: transform` on an ancestor of a `ScrollTrigger` `pin: true` container (`PageTransition` animates `opacity` only).
- All GSAP animations live inside `useGSAP(..., { scope })` and wrap motion inside `gsap.matchMedia()`.
- `AnimationProvider` uses `useSyncExternalStore` for both `(prefers-reduced-motion: reduce)` and user-toggled `ambientMotionPaused` (`localStorage` + `data-ambient-motion="paused"`), disabling Lenis, custom cursor, magnetic buttons, preloader, parallax, and continuous WebGL when active.
- `CustomCursor` and `MagneticButton` are enabled strictly on desktop fine-pointer devices (`(pointer: fine) and (hover: hover)` at `>= 1024px`) and never intercept pointer events.
- `Preloader` is session-aware (`sessionStorage`), `pointer-events-none`, `aria-hidden="true"`, and never blocks navigation or initial LCP text.
