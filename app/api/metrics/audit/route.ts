import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// Request timeout: 15 segundos
const REQUEST_TIMEOUT = 15000;

export async function GET(request: NextRequest) {
  // Set up timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const client = createClient();

    // Fetch all contributions with quality flags (no personal data exposed)
    const { data: allContributions, error: fetchError } = await client
      .from("mapa_contribuicoes")
      .select("is_complete, is_test, estado, municipio_normalized");

    clearTimeout(timeoutId);

    if (fetchError) {
      console.error("Error fetching contributions for audit:", fetchError);
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível gerar relatório de auditoria",
        },
        { status: 500 }
      );
    }

    const total = allContributions?.length || 0;
    const complete = allContributions?.filter((r) => r.is_complete === true).length || 0;
    const incomplete = total - complete;
    const testRecords = allContributions?.filter((r) => r.is_test === true).length || 0;
    const validRecords = complete - testRecords;

    // Count by state
    const byState = new Map<string, { total: number; complete: number; test: number }>();
    allContributions?.forEach((contrib) => {
      const estado = contrib.estado || "UNKNOWN";
      if (!byState.has(estado)) {
        byState.set(estado, { total: 0, complete: 0, test: 0 });
      }
      const stats = byState.get(estado)!;
      stats.total += 1;
      if (contrib.is_complete) stats.complete += 1;
      if (contrib.is_test) stats.test += 1;
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          timestamp: new Date().toISOString(),
          summary: {
            totalRecords: total,
            completeRecords: complete,
            incompleteRecords: incomplete,
            testRecords: testRecords,
            validRecords: validRecords,
            completenessPercent: total > 0 ? Math.round((complete / total) * 100 * 100) / 100 : 0,
            validityPercent: total > 0 ? Math.round((validRecords / total) * 100 * 100) / 100 : 0,
          },
          byState: Object.fromEntries(byState),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Audit] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível processar a requisição",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
