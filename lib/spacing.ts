/**
 * Spacing and Layout System - Mapa do Cuidado
 * Implements consistent rhythm and visual hierarchy
 */

// ============================================================================
// CONTAINER AND WIDTH LIMITS
// ============================================================================

export const containers = {
  // Main content container
  maxWidth: "7xl", // Tailwind: 80rem / 1280px
  tight: "4xl", // Tailwind: 56rem / 896px
  narrow: "2xl", // Tailwind: 42rem / 672px

  // Text width limit (readability)
  textMax: "3xl", // Tailwind: 48rem / 768px
};

// ============================================================================
// SECTION SPACING - Vertical Rhythm
// ============================================================================

export const sectionSpacing = {
  // Desktop: 96–128 px breathing room between major sections
  desktop: {
    small: "py-12", // 48px
    base: "py-16", // 64px (standard)
    large: "py-20", // 80px
    xl: "py-24", // 96px
    xxl: "py-32", // 128px
  },

  // Tablet: 72–96 px
  tablet: {
    small: "sm:py-8", // 32px
    base: "sm:py-12", // 48px
    large: "sm:py-16", // 64px
    xl: "sm:py-20", // 80px
  },

  // Mobile: 56–72 px
  mobile: {
    small: "py-6", // 24px
    base: "py-8", // 32px
    large: "py-12", // 48px
  },

  // Combined responsive
  standard: "py-8 sm:py-12 lg:py-16", // 32px -> 48px -> 64px
  generous: "py-12 sm:py-16 lg:py-20", // 48px -> 64px -> 80px
  spacious: "py-16 sm:py-20 lg:py-24", // 64px -> 80px -> 96px
};

// ============================================================================
// INTERNAL SPACING - Between elements within sections
// ============================================================================

export const elementSpacing = {
  // Gap between grid items
  gap: {
    compact: "gap-4", // 16px
    base: "gap-6", // 24px
    loose: "gap-8", // 32px
  },

  // Space below titles
  titleGap: {
    small: "mb-2", // 8px
    base: "mb-3", // 12px
    large: "mb-4", // 16px
  },

  // Space between content groups
  groupGap: {
    tight: "space-y-4", // 16px
    base: "space-y-6", // 24px
    loose: "space-y-8", // 32px
  },

  // Padding inside containers
  padding: {
    compact: "p-4 sm:p-6", // 16px -> 24px
    base: "p-6 sm:p-8", // 24px -> 32px
    spacious: "p-8 sm:p-12", // 32px -> 48px
  },
};

// ============================================================================
// CARD AND COMPONENT STYLING
// ============================================================================

export const cardStyles = {
  base: "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow",
  spacious: "p-6 sm:p-8 space-y-6",
  compact: "p-4 sm:p-6 space-y-4",
};

// ============================================================================
// GRID SYSTEMS
// ============================================================================

export const grids = {
  // 12-column grid layout
  desktop12: "grid grid-cols-12 gap-6 lg:gap-8",

  // Responsive column configs
  responsive: {
    "1col": "grid grid-cols-1",
    "2col": "grid grid-cols-1 md:grid-cols-2",
    "3col": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4col": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    "6col": "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  },

  // Common gaps
  gap: {
    tight: "gap-4",
    base: "gap-6",
    loose: "gap-8",
  },
};

// ============================================================================
// BACKGROUND ALTERNATION
// ============================================================================

export const backgrounds = {
  primary: "bg-white",
  secondary: "bg-gray-50",
  tertiary: "bg-gray-100",
  accent: "bg-blue-50",
};

export const sectionBg = {
  // Alternate backgrounds for visual rhythm
  light: "bg-white",
  lighter: "bg-gray-50",
  lightest: "bg-gray-100",
};

// ============================================================================
// TITLE TO CONTENT SPACING
// ============================================================================

export const titleContent = {
  // Space between title and content
  gap: "gap-4 lg:gap-6", // 16-24px
  // Subtitle below title
  subtitle: "mb-3 lg:mb-4", // 12-16px
  // Content starts
  content: "mt-8 sm:mt-10 lg:mt-12", // 32-48px
};

// ============================================================================
// SECTION CONTAINER WRAPPER
// ============================================================================

export const sectionWrapper = {
  // Standard section with padding and container
  base: "w-full px-4 sm:px-6 lg:px-8",
  // Inside max container
  container: "max-w-7xl mx-auto",
};

// ============================================================================
// TEXT WIDTH LIMITS (Readability)
// ============================================================================

export const textWidth = {
  // Paragraph max width
  prose: "max-w-3xl", // 48rem / 768px
  narrow: "max-w-2xl", // 42rem / 672px
  wide: "max-w-4xl", // 56rem / 896px
};
