import { createClient } from "@supabase/supabase-js";

interface AdminStatus {
  supabase: {
    status: "online" | "offline" | "error";
    lastCheck: string;
    responseTime: number;
  };
  data: {
    totalToday: number;
    totalAllTime: number;
    pendingSubmissions: number;
    lastResponseReceived: {
      timestamp: string;
      municipio: string;
      status: "success" | "error";
    } | null;
    recentErrors: Array<{
      timestamp: string;
      error: string;
      count: number;
    }>;
  };
  tablets: {
    active: number;
    lastActivity: string | null;
  };
}

export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check Supabase connection
    const { data: healthCheck, error: healthError } = await supabase
      .from("mapa_contribuicoes")
      .select("id", { count: "exact", head: true });

    const responseTime = Date.now() - startTime;
    const supabaseStatus = healthError ? "error" : "online";

    // Get total sent today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: totalToday, error: todayError } = await supabase
      .from("mapa_contribuicoes")
      .select("id", { count: "exact", head: true })
      .gte("criado_em", today.toISOString());

    // Get total all time
    const { count: totalAllTime } = await supabase
      .from("mapa_contribuicoes")
      .select("id", { count: "exact", head: true });

    // Get last response received
    const { data: lastResponse } = await supabase
      .from("mapa_contribuicoes")
      .select("criado_em, municipio")
      .order("criado_em", { ascending: false })
      .limit(1)
      .single();

    // Get pending submissions (from expansion form)
    const { count: pendingSubmissions } = await supabase
      .from("mapa_expansao")
      .select("id", { count: "exact", head: true });

    // Get recent errors (from error logs if available)
    // For now, we'll return empty array as error logging isn't implemented yet
    const recentErrors: Array<{
      timestamp: string;
      error: string;
      count: number;
    }> = [];

    // Get active tablets (devices with tablet origin from last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: tabletSessions } = await supabase
      .from("analytics_events")
      .select("session_id, timestamp")
      .eq("origin", "tablet")
      .gte("timestamp", yesterday.toISOString())
      .order("timestamp", { ascending: false });

    const uniqueTabletSessions = new Set(
      (tabletSessions || []).map((e) => e.session_id)
    );
    const lastTabletActivity =
      tabletSessions && tabletSessions.length > 0
        ? tabletSessions[0].timestamp
        : null;

    const status: AdminStatus = {
      supabase: {
        status: supabaseStatus as "online" | "offline" | "error",
        lastCheck: new Date().toISOString(),
        responseTime,
      },
      data: {
        totalToday: totalToday || 0,
        totalAllTime: totalAllTime || 0,
        pendingSubmissions: pendingSubmissions || 0,
        lastResponseReceived: lastResponse
          ? {
              timestamp: lastResponse.criado_em,
              municipio: lastResponse.municipio,
              status: "success",
            }
          : null,
        recentErrors,
      },
      tablets: {
        active: uniqueTabletSessions.size,
        lastActivity: lastTabletActivity,
      },
    };

    return Response.json(status);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error("Admin status error:", error);

    const errorStatus: AdminStatus = {
      supabase: {
        status: "error",
        lastCheck: new Date().toISOString(),
        responseTime,
      },
      data: {
        totalToday: 0,
        totalAllTime: 0,
        pendingSubmissions: 0,
        lastResponseReceived: null,
        recentErrors: [
          {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error",
            count: 1,
          },
        ],
      },
      tablets: {
        active: 0,
        lastActivity: null,
      },
    };

    return Response.json(errorStatus, { status: 500 });
  }
}
