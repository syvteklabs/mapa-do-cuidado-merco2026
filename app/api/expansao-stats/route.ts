import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service";

export async function GET() {
  try {
    const result = await supabaseService.getExpansaoStats();

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
        error: "Erro ao buscar estatísticas de expansão",
      },
      { status: 500 }
    );
  }
}
