import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service";
import { CreateContribuicaoRequest } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body: CreateContribuicaoRequest = await request.json();

    // Validate required fields
    if (!body.municipio || !body.estado || !body.resposta_categoria) {
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
      return NextResponse.json(
        {
          success: false,
          error: "Estado deve ter 2 letras",
        },
        { status: 400 }
      );
    }

    const result = await supabaseService.createContribuicao(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contribuição salva com sucesso",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar requisição",
      },
      { status: 500 }
    );
  }
}

// For aggregated statistics (no personal data)
export async function GET() {
  try {
    const result = await supabaseService.getContribuicoesStats();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
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
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar estatísticas",
      },
      { status: 500 }
    );
  }
}
