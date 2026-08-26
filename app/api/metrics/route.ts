import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service";

// Unified public map metrics (single source of truth)
// Returns metrics for all indicators across the platform
export async function GET() {
  const REQUEST_TIMEOUT = 15000; // 15 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const result = await supabaseService.getPublicMapMetrics();

    if (!result.success) {
      console.error("[GET /api/metrics] Error:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível carregar os dados agora",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/metrics] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível carregar os dados agora",
      },
      { status: 503 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
