/**
 * Animation System - Mapa do Cuidado
 * Subtle, accessible animations that respect prefers-reduced-motion
 */

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const animations = {
  // Duration
  durations: {
    fast: 150,      // ms - quick feedback
    base: 300,      // ms - standard
    slow: 500,      // ms - emphasis
  },

  // Easing
  easing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    linear: "linear",
  },

  // Delay
  delay: {
    none: "delay-0",
    xs: "delay-75",
    sm: "delay-100",
    base: "delay-150",
    lg: "delay-200",
  },
};

// ============================================================================
// TAILWIND ANIMATION CLASSES (prefers-reduced-motion aware)
// ============================================================================

export const animationClasses = {
  // Fade in animations
  fadeIn: "animate-fadeIn",
  fadeInUp: "animate-fadeInUp",
  fadeInDown: "animate-fadeInDown",

  // Scale animations
  scaleIn: "animate-scaleIn",
  scaleInSm: "animate-scaleInSm",

  // Pulse animations (subtle)
  pulse: "animate-pulse",
  pulseSubtle: "animate-pulseSubtle",

  // Slide animations
  slideInLeft: "animate-slideInLeft",
  slideInRight: "animate-slideInRight",
  slideInUp: "animate-slideInUp",

  // Bounce (rare, only for importance)
  bounceLight: "animate-bounceLight",

  // Spinner for loading
  spin: "animate-spin",
};

// ============================================================================
// CSS ANIMATION DEFINITIONS
// ============================================================================

export const animationKeyframes = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleInSm {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSubtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes bounceLight {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Respects prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ============================================================================
// ANIMATION UTILITY FUNCTIONS
// ============================================================================

/**
 * Get animation class with reduced-motion support
 */
export function getAnimationClass(
  animation: string,
  duration: "fast" | "base" | "slow" = "base",
  respectReduced: boolean = true
): string {
  if (!respectReduced) return animation;

  // Will be handled by CSS media query
  return animation;
}

/**
 * Progressive counter animation
 * Counts from start to end value without showing 0 if loading
 */
export function useProgressiveCounter(
  targetValue: number,
  duration: number = 500,
  isLoading: boolean = false
) {
  if (isLoading || targetValue === 0) {
    return null; // Don't show anything while loading
  }

  return targetValue; // Return actual value (animation handled via CSS)
}

/**
 * Skeleton loading classes
 */
export const skeleton = {
  base: "bg-gray-200 rounded animate-pulse",
  height: {
    sm: "h-4",
    base: "h-6",
    lg: "h-8",
    xl: "h-12",
  },
  width: {
    full: "w-full",
    half: "w-1/2",
    third: "w-1/3",
  },
};

/**
 * Get stagger delay for sequential animations
 */
export function getStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
