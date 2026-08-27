import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { format = "csv", includeInvalid = false } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Query contributions without sensitive data
    let query = supabase
      .from("mapa_contribuicoes")
      .select("municipio, estado, resposta_categoria, criado_em");

    if (!includeInvalid) {
      query = query
        .not("municipio", "is", null)
        .not("estado", "is", null)
        .not("resposta_categoria", "is", null);
    }

    const { data, error } = await query.order("criado_em", {
      ascending: false,
    });

    if (error) {
      console.error("Export error:", error);
      return Response.json(
        { error: "Failed to export data" },
        { status: 500 }
      );
    }

    if (format === "json") {
      return Response.json(
        {
          exported_at: new Date().toISOString(),
          count: data?.length || 0,
          data: data || [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Disposition":
              'attachment; filename="mapa-do-cuidado-export.json"',
          },
        }
      );
    }

    // CSV format
    if (!data || data.length === 0) {
      return Response.json({ error: "No data to export" }, { status: 400 });
    }

    const headers = [
      "Município",
      "Estado",
      "Categoria de Resposta",
      "Data/Hora",
    ];
    const rows = data.map((row: any) => [
      row.municipio || "",
      row.estado || "",
      row.resposta_categoria || "",
      new Date(row.criado_em).toLocaleString("pt-BR"),
    ]);

    const csv =
      [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n") + "\n";

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="mapa-do-cuidado-export.csv"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
