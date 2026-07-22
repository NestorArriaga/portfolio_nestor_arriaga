export const MotionTokens = {
  duration: {
    instant: 0.12,
    fast: 0.20,
    normal: 0.40,
    slow: 0.70,
    cinematic: 1.10,
    ambient: 15.0
  },
  ease: {
    interface: [0.25, 1, 0.5, 1] as const, // Deceleration
    enter: [0.0, 0.0, 0.2, 1] as const,
    exit: [0.4, 0.0, 1, 1] as const,
    cinematic: [0.16, 1, 0.3, 1] as const, // Smooth extreme easing
    spring: { type: "spring", stiffness: 300, damping: 30 }
  },
  scale: {
    hoverImage: 1.025,
    heroIdle: 1.0,
    heroAmbient: 1.04,
    heroTransition: 1.02
  },
  distance: {
    revealSmall: 16,
    revealMedium: 32,
    revealLarge: 64,
    pointerDepthNear: 4,
    pointerDepthFar: 14
  }
};
