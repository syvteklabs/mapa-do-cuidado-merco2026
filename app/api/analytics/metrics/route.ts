import { createClient } from "@supabase/supabase-js";
import { ConversionFunnel } from "@/lib/analytics/types";

/**
 * GET /api/analytics/metrics
 * Get funnel and conversion metrics
 * Query params:
 * - days: number of days to look back (default: 7)
 */
export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get("days") || "7");

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all events in the date range
    const { data: events, error } = await supabase
      .from("analytics_events")
      .select("event_type, session_id")
      .gte("timestamp", startDate.toISOString());

    if (error) {
      console.error("Analytics query error:", error);
      return Response.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }

    // Calculate funnel metrics
    const uniqueSessions = new Set(events?.map(e => e.session_id) || []);
    const eventCounts = new Map<string, number>();

    events?.forEach(e => {
      eventCounts.set(e.event_type, (eventCounts.get(e.event_type) || 0) + 1);
    });

    // Funnel calculation
    const pageViews = uniqueSessions.size; // Each session is a page view
    const formStarts = eventCounts.get("form_start") || 0;
    const formCompletes = eventCounts.get("form_complete") || 0;
    const mapOpens = eventCounts.get("map_open") || 0;
    const shares =
      (eventCounts.get("share_whatsapp") || 0) +
      (eventCounts.get("share_copy_link") || 0) +
      (eventCounts.get("share_download_card") || 0);

    const funnel: ConversionFunnel = {
      viewed: pageViews,
      started: formStarts,
      completed: formCompletes,
      opened_map: mapOpens,
      shared: shares,
      start_rate: pageViews > 0 ? (formStarts / pageViews) * 100 : 0,
      completion_rate: formStarts > 0 ? (formCompletes / formStarts) * 100 : 0,
      map_rate: formCompletes > 0 ? (mapOpens / formCompletes) * 100 : 0,
      share_rate: formCompletes > 0 ? (shares / formCompletes) * 100 : 0,
    };

    return Response.json(funnel);
  } catch (error) {
    console.error("Analytics metrics error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
