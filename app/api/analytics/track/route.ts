import { createClient } from "@supabase/supabase-js";
import { AnalyticsEvent } from "@/lib/analytics/types";

/**
 * POST /api/analytics/track
 * Track analytics events without storing sensitive response data
 */
export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const event: AnalyticsEvent = await request.json();

    // Validate event
    if (!event.event_type || !event.session_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into analytics_events table
    const { error } = await supabase.from("analytics_events").insert([
      {
        event_type: event.event_type,
        timestamp: event.timestamp,
        session_id: event.session_id,
        page_path: event.page_path,
        origin: event.origin,
        step: event.step || null,
        time_spent: event.time_spent || null,
        device_type: event.device_type,
        browser: event.browser,
      },
    ]);

    if (error) {
      console.error("Analytics insert error:", error);
      return Response.json(
        { error: "Failed to track event" },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
