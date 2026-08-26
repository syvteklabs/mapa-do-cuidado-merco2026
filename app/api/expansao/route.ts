import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service";
import { CreateExpansaoRequest } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body: CreateExpansaoRequest = await request.json();

    // Validate required fields
    if (!body.nome || !body.cidade || !body.estado) {
      return NextResponse.json(
        {
          success: false,
          error: "Nome, cidade e estado são obrigatórios",
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

    // Validate consent
    if (!body.consentimento_contato) {
      return NextResponse.json(
        {
          success: false,
          error: "Consentimento para contato é obrigatório",
        },
        { status: 400 }
      );
    }

    const result = await supabaseService.createExpansao(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Interesse em expansão registrado com sucesso",
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
