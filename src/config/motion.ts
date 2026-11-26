export type MotionQualityTier = "desktop" | "tablet" | "mobile" | "reduced";

export interface ThreeQualityPreset {
  dpr: [number, number];
  particleCount: number;
  outerDetail: number;
  coreDetail: number;
  nodeCount: number;
  enableConnections: boolean;
  rotationSpeed: number;
}

export const MOTION_DURATIONS = {
  micro: 0.18,
  ui: 0.3,
  reveal: 0.65,
  cinematic: 0.95,
  counter: 1.1,
  preloader: 0.65,
} as const;

export const MOTION_EASES = {
  gsap: {
    out: "power3.out",
    inOut: "power2.inOut",
    expoOut: "expo.out",
    none: "none",
  },
  framer: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
    spring: { type: "spring", stiffness: 380, damping: 32, mass: 0.9 } as const,
    snappySpring: { type: "spring", stiffness: 460, damping: 34 } as const,
  },
} as const;

export const MOTION_STAGGER = {
  tight: 0.045,
  base: 0.075,
  relaxed: 0.1,
} as const;

export const MOTION_DISTANCES = {
  sm: 12,
  md: 22,
  lg: 36,
} as const;

export const MOTION_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 86%",
  end: "bottom 18%",
  once: true,
  invalidateOnRefresh: true,
} as const;

export const MOTION_VARIANTS = {
  pageEnter: {
    initial: { opacity: 0.92, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATIONS.ui, ease: MOTION_EASES.framer.out },
    },
  },
  cardHover: {
    y: -3,
    transition: { duration: MOTION_DURATIONS.micro, ease: MOTION_EASES.framer.out },
  },
  filterItem: {
    initial: { opacity: 0, scale: 0.98, y: 8 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: MOTION_DURATIONS.ui, ease: MOTION_EASES.framer.out },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: -6,
      transition: { duration: MOTION_DURATIONS.micro, ease: MOTION_EASES.framer.inOut },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: MOTION_STAGGER.tight,
      },
    },
  },
  staggerChild: {
    hidden: { opacity: 0, y: MOTION_DISTANCES.sm },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATIONS.ui, ease: MOTION_EASES.framer.out },
    },
  },
} as const;

export const THREE_QUALITY_PRESETS: Record<MotionQualityTier, ThreeQualityPreset> = {
  desktop: {
    dpr: [1, 1.5],
    particleCount: 96,
    outerDetail: 2,
    coreDetail: 1,
    nodeCount: 54,
    enableConnections: true,
    rotationSpeed: 0.22,
  },
  tablet: {
    dpr: [1, 1.35],
    particleCount: 52,
    outerDetail: 1,
    coreDetail: 1,
    nodeCount: 36,
    enableConnections: true,
    rotationSpeed: 0.18,
  },
  mobile: {
    dpr: [1, 1.2],
    particleCount: 28,
    outerDetail: 1,
    coreDetail: 0,
    nodeCount: 24,
    enableConnections: false,
    rotationSpeed: 0.14,
  },
  reduced: {
    dpr: [1, 1],
    particleCount: 0,
    outerDetail: 1,
    coreDetail: 0,
    nodeCount: 0,
    enableConnections: false,
    rotationSpeed: 0,
  },
};
