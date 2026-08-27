// Design System Tokens for Mapa do Cuidado

export const colors = {
  // Primary - Main action, participation, engagement
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Secondary - Needs/necessities (teal/cyan accent)
  secondary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#134e4a",
    900: "#0f2f2f",
  },

  // Accent - Sentiments/emotions (amber/orange)
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Success - Only for active/success states
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#145231",
  },

  // Error - Minimal, only for errors
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Warning - Alerts, non-critical messages
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Neutral
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Semantic
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
} as const;

export const borderRadius = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
} as const;

export const typography = {
  heading1: {
    fontSize: "2.25rem", // 36px
    fontWeight: "700",
    lineHeight: "2.5rem",
  },
  heading2: {
    fontSize: "1.875rem", // 30px
    fontWeight: "700",
    lineHeight: "2.25rem",
  },
  heading3: {
    fontSize: "1.5rem", // 24px
    fontWeight: "700",
    lineHeight: "1.875rem",
  },
  bodyLarge: {
    fontSize: "1.125rem", // 18px
    fontWeight: "400",
    lineHeight: "1.75rem",
  },
  body: {
    fontSize: "1rem", // 16px
    fontWeight: "400",
    lineHeight: "1.5rem",
  },
  bodySmall: {
    fontSize: "0.875rem", // 14px
    fontWeight: "400",
    lineHeight: "1.25rem",
  },
  caption: {
    fontSize: "0.75rem", // 12px
    fontWeight: "400",
    lineHeight: "1rem",
  },
} as const;

// Component-specific token sets
export const componentTokens = {
  card: {
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg,
    shadow: shadows.sm,
    padding: "24px", // Tailwind p-6
    gap: "16px",
  },
  cardPrimary: {
    border: `2px solid ${colors.primary[200]}`,
    borderRadius: borderRadius.lg,
    shadow: shadows.sm,
    padding: "24px",
    backgroundColor: colors.primary[50],
  },
  button: {
    borderRadius: borderRadius.lg,
    padding: "16px 24px", // Tailwind px-6 py-4
  },
  input: {
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.gray[300]}`,
    padding: "12px 16px",
  },
} as const;
