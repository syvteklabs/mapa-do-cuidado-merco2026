// Accessibility utilities and helpers

export const focusElement = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  if (delay > 0) {
    setTimeout(() => element.focus(), delay);
  } else {
    element.focus();
  }
};

export const announceToScreenReader = (message: string, priority: "polite" | "assertive" = "polite") => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.setAttribute("role", "status");
  announcement.className = "sr-only";
  announcement.textContent = message;

  // Add aria-live region to body if it doesn't exist
  const container = document.getElementById("aria-live-region") || (() => {
    const div = document.createElement("div");
    div.id = "aria-live-region";
    div.className = "sr-only";
    document.body.appendChild(div);
    return div;
  })();

  container.appendChild(announcement);

  // Remove after announcement is read
  setTimeout(() => announcement.remove(), 3000);
};

// Verify minimum touch target size (44x44px WCAG 2.1 Level AAA)
export const checkTouchTargetSize = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.width >= 44 && rect.height >= 44;
};

// Check color contrast ratio (WCAG AA requires 4.5:1 for normal text, 3:1 for large text)
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

export const getContrastRatio = (rgb1: string, rgb2: string): number => {
  const parseRgb = (rgb: string) => {
    const matches = rgb.match(/\d+/g);
    return matches ? matches.map(Number) : [0, 0, 0];
  };

  const [r1, g1, b1] = parseRgb(rgb1);
  const [r2, g2, b2] = parseRgb(rgb2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Keyboard navigation helpers
export const isEnterKey = (e: KeyboardEvent) => e.key === "Enter" || e.code === "Enter";
export const isSpaceKey = (e: KeyboardEvent) => e.key === " " || e.code === "Space";
export const isEscapeKey = (e: KeyboardEvent) => e.key === "Escape" || e.code === "Escape";
export const isTabKey = (e: KeyboardEvent) => e.key === "Tab" || e.code === "Tab";
