// Analytics event types - no sensitive data stored
export type EventType =
  | "page_view"
  | "participate_click"
  | "form_start"
  | "form_step_progress"
  | "form_step_abandon"
  | "form_complete"
  | "map_open"
  | "share_whatsapp"
  | "share_copy_link"
  | "share_download_card"
  | "expansion_register"
  | "new_participation_alert";

export type EventOrigin = "qr" | "tablet" | "instagram" | "direct_link" | "unknown";

export interface AnalyticsEvent {
  event_type: EventType;
  timestamp: string;
  session_id: string;
  page_path: string;
  origin?: EventOrigin;
  step?: number; // for form steps
  time_spent?: number; // milliseconds
  device_type?: "mobile" | "tablet" | "desktop";
  browser?: string;
}

export interface FunnelMetrics {
  page_views: number;
  participate_clicks: number;
  form_starts: number;
  form_completions: number;
  map_opens: number;
  shares: number;
  expansion_registrations: number;
  average_form_time: number;
  abandonment_by_step: Record<number, number>;
  origin_distribution: Record<EventOrigin, number>;
}

export interface ConversionFunnel {
  viewed: number;
  started: number;
  completed: number;
  opened_map: number;
  shared: number;
  // Calculate conversion rates
  start_rate: number;
  completion_rate: number;
  map_rate: number;
  share_rate: number;
}
