import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service";
import { CreateContribuicaoRequest } from "@/types/database";
import { validateContribuicao, isTestRecord } from "@/lib/validation";

// Request timeout: 15 segundos
const REQUEST_TIMEOUT = 15000;

export async function POST(request: NextRequest) {
  // Set up timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    let body: CreateContribuicaoRequest;
    try {
      body = await request.json();
    } catch (err) {
      console.error("[POST] Invalid JSON:", err);
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.municipio || !body.estado || !body.resposta_categoria) {
      console.warn("[POST] Missing required fields");
      return NextResponse.json(
        {
          success: false,
          error: "Campos obrigatórios faltando",
        },
        { status: 400 }
      );
    }

    // Validate state format (2 letters)
    if (body.estado.length !== 2) {
      console.warn("[POST] Invalid state format:", body.estado);
      return NextResponse.json(
        {
          success: false,
          error: "Estado deve ter 2 letras",
        },
        { status: 400 }
      );
    }

    // Validate category exists
    const validCategories = [
      "dificuldade-continuar",
      "falta-orientacao",
      "espera-encaminhamento",
      "interrupcao-acompanhamento",
      "mais-apoio",
      "outra-percepcao",
    ];
    if (!validCategories.includes(body.resposta_categoria)) {
      console.warn("[POST] Invalid category:", body.resposta_categoria);
      return NextResponse.json(
        {
          success: false,
          error: "Categoria inválida",
        },
        { status: 400 }
      );
    }

    // Run comprehensive validation to detect data quality issues
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    const validation = validateContribuicao({
      municipio: body.municipio,
      estado: body.estado,
      resposta_categoria: body.resposta_categoria,
      ip: ipAddress || undefined,
    });

    // Create enriched data with validation results
    const enrichedData = {
      ...body,
      is_complete: validation.isComplete,
      is_test: validation.isTest,
      municipio_normalized: validation.municipioNormalized,
      participation_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    const result = await supabaseService.createContribuicao(enrichedData);

    if (!result.success) {
      console.error("[POST] Supabase error:", result.error);
      // User-friendly error only
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível salvar sua resposta. Tente novamente.",
        },
        { status: 500 }
      );
    }

    // Try to get total of contributions (non-critical)
    let total = 0;
    try {
      const statsResult = await supabaseService.getContribuicoesStats();
      total = statsResult.success ? statsResult.data?.total || 0 : 0;
    } catch (statsErr) {
      // Stats fetch failure is not critical - contribution was saved
      console.warn("[POST] Could not fetch stats:", statsErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contribuição salva com sucesso",
        total: total,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST] Unexpected error:", error);
    // User-friendly error message - no technical details
    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível processar sua resposta. Tente novamente.",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

// For aggregated statistics (no personal data)
export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const result = await supabaseService.getContribuicoesStats();

    if (!result.success) {
      console.error("[GET] Stats error:", result.error);
      // User-friendly error for stats
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível carregar os dados agora",
        },
        { status: 503 }
      );
    }

    // Ensure all required fields exist in response
    const safeData = {
      total: result.data?.total || 0,
      byState: result.data?.byState || {},
      byMunicipio: result.data?.byMunicipio || {},
      byCategory: result.data?.byCategory || {},
    };

    return NextResponse.json(
      {
        success: true,
        data: safeData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET] Unexpected error:", error);
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
