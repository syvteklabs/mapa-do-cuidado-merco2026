import { AnalyticsEvent, EventType, EventOrigin } from "./types";

// Get or create session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

// Detect origin from URL params or referrer
function detectOrigin(): EventOrigin {
  if (typeof window === "undefined") return "unknown";

  const params = new URLSearchParams(window.location.search);

  if (params.has("utm_source")) {
    const source = params.get("utm_source");
    if (source === "qr") return "qr";
    if (source === "instagram") return "instagram";
  }

  if (params.has("origin")) {
    const origin = params.get("origin");
    if (origin === "tablet") return "tablet";
    if (origin === "qr") return "qr";
  }

  return "direct_link";
}

// Detect device type
function detectDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// Get browser info
function getBrowser(): string {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

/**
 * Track an analytics event
 * No sensitive data (like form responses) is stored
 */
export async function trackEvent(
  eventType: EventType,
  options?: {
    step?: number;
    time_spent?: number;
  }
): Promise<void> {
  if (typeof window === "undefined") return;

  const event: AnalyticsEvent = {
    event_type: eventType,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    page_path: window.location.pathname,
    origin: detectOrigin(),
    device_type: detectDeviceType(),
    browser: getBrowser(),
    ...options,
  };

  try {
    // Send to API endpoint
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      // Don't wait for response, fire and forget
      keepalive: true,
    });
  } catch (error) {
    // Silently fail - don't break the app if analytics fail
    console.debug("Analytics tracking failed:", error);
  }
}

/**
 * Track page view
 */
export function trackPageView(): void {
  trackEvent("page_view");
}

/**
 * Track form progression
 */
export function trackFormStart(): void {
  trackEvent("form_start");
}

export function trackFormStepProgress(step: number): void {
  trackEvent("form_step_progress", { step });
}

export function trackFormStepAbandon(step: number, time_spent: number): void {
  trackEvent("form_step_abandon", { step, time_spent });
}

export function trackFormComplete(time_spent: number): void {
  trackEvent("form_complete", { time_spent });
}

/**
 * Track engagement events
 */
export function trackParticipateClick(): void {
  trackEvent("participate_click");
}

export function trackMapOpen(): void {
  trackEvent("map_open");
}

export function trackShare(type: "whatsapp" | "link" | "card"): void {
  const eventMap = {
    whatsapp: "share_whatsapp" as EventType,
    link: "share_copy_link" as EventType,
    card: "share_download_card" as EventType,
  };
  trackEvent(eventMap[type]);
}

export function trackExpansionRegister(): void {
  trackEvent("expansion_register");
}

export function trackNewParticipationAlert(): void {
  trackEvent("new_participation_alert");
}
