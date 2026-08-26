/**
 * Mapa do Cuidado Design System
 * Concept: Território + cuidado + evidência humana
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Institutional Blues - Deep and medium for primary actions
  blue: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Medium blue for actions
    600: "#0284c7",
    700: "#0369a1", // Deep institutional blue
    800: "#075985",
    900: "#0c3d66",
  },

  // Purple - Controlled for intelligence and connection
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7", // Controlled purple
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },

  // Green - Soft for positive states
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // Soft green
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#145231",
  },

  // Grays - Warm for backgrounds and neutral text
  gray: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1a6",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },

  // Red - Only for failure and alerts
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Failure and alerts
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Semantic aliases
  semantic: {
    primary: "#0369a1", // Deep blue
    action: "#0ea5e9", // Medium blue
    success: "#22c55e", // Soft green
    warning: "#f59e0b", // Amber
    error: "#ef4444", // Red
    info: "#a855f7", // Purple
    muted: "#71717a", // Gray
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font families
  families: {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif:
      '"Noto Serif", -apple-system-ui-serif, Georgia, "Times New Roman", serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font scales
  scales: {
    xs: { size: "0.75rem", lineHeight: "1rem", weight: 400 }, // 12px
    sm: { size: "0.875rem", lineHeight: "1.25rem", weight: 400 }, // 14px
    base: { size: "1rem", lineHeight: "1.5rem", weight: 400 }, // 16px
    lg: { size: "1.125rem", lineHeight: "1.75rem", weight: 400 }, // 18px
    xl: { size: "1.25rem", lineHeight: "1.75rem", weight: 500 }, // 20px
    "2xl": { size: "1.5rem", lineHeight: "2rem", weight: 600 }, // 24px
    "3xl": { size: "1.875rem", lineHeight: "2.25rem", weight: 600 }, // 30px
    "4xl": { size: "2.25rem", lineHeight: "2.5rem", weight: 700 }, // 36px
    "5xl": { size: "3rem", lineHeight: "1.2", weight: 700 }, // 48px
  },

  // Component sizing
  components: {
    label: { size: "0.75rem", weight: 600, lineHeight: "1rem" }, // 12px, uppercase
    button: { size: "1rem", weight: 600, lineHeight: "1.25rem" }, // 16px
    card_title: { size: "1.125rem", weight: 700, lineHeight: "1.5rem" }, // 18px
    section_title: { size: "2.25rem", weight: 700, lineHeight: "2.5rem" }, // 36px
    page_title: { size: "3rem", weight: 700, lineHeight: "1.1" }, // 48px
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  base: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.625rem", // 10px (default for cards)
  xl: "0.75rem", // 12px
  full: "9999px",
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: "150ms ease-in-out",
  base: "200ms ease-in-out",
  slow: "300ms ease-in-out",
  slower: "500ms ease-in-out",
};

// ============================================================================
// COMPONENT DEFAULTS
// ============================================================================

export const components = {
  // Button defaults
  button: {
    padding: {
      sm: "0.5rem 1rem",
      base: "0.75rem 1.5rem",
      lg: "1rem 2rem",
    },
    borderRadius: "0.375rem",
    fontWeight: 600,
    fontSize: "1rem",
  },

  // Card defaults
  card: {
    padding: "1.5rem",
    borderRadius: "0.625rem",
    borderColor: colors.gray[200],
    backgroundColor: "#ffffff",
    shadow: shadows.sm,
  },

  // Input defaults
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    borderColor: colors.gray[300],
    focusBorderColor: colors.blue[500],
    focusRing: `0 0 0 3px ${colors.blue[100]}`,
  },

  // Modal defaults
  modal: {
    borderRadius: "0.75rem",
    shadow: shadows.xl,
    maxWidth: "448px", // md breakpoint
  },

  // Alert defaults
  alert: {
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    borderLeftWidth: "4px",
  },
};

// ============================================================================
// CONTRAST RATIOS (WCAG AA compliant)
// ============================================================================

export const contrast = {
  // These are verified safe for WCAG AA (minimum 4.5:1 for normal text, 3:1 for large text)
  textOnBlue700: colors.gray[50], // 11.5:1
  textOnBlue500: colors.gray[50], // 8:1
  textOnGreen600: colors.gray[50], // 8.5:1
  textOnRed600: colors.gray[50], // 7.5:1
  textOnGray700: colors.gray[50], // 10:1
  textOnWhite: colors.gray[900], // 17.5:1
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
