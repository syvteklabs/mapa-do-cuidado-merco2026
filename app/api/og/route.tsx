import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
            padding: "60px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 8,
              height: "100%",
              background: "linear-gradient(180deg, #3b82f6 0%, #1e40af 100%)",
            }}
          />

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Title */}
            <h1
              style={{
                fontSize: 80,
                fontWeight: 700,
                margin: 0,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Mapa do Cuidado
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontSize: 40,
                fontWeight: 600,
                margin: 0,
                color: "#6b7280",
              }}
            >
              Escuta Participativa
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 28,
                fontWeight: 400,
                margin: 0,
                color: "#374151",
                maxWidth: "80%",
                lineHeight: 1.4,
              }}
            >
              Compartilhe sua percepção sobre os caminhos do cuidado
            </p>

            {/* Region */}
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                margin: 0,
                color: "#6b7280",
              }}
            >
              Noroeste Fluminense • 13 Municípios
            </p>
          </div>

          {/* Footer info */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 60,
              display: "flex",
              justifyContent: "space-between",
              width: "calc(100% - 120px)",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                margin: 0,
                color: "#6b7280",
              }}
            >
              mapa-do-cuidado-merco2026.vercel.app
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                  color: "#1e40af",
                }}
              >
                SyVtek Care
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  margin: 0,
                  color: "#3b82f6",
                  paddingLeft: 12,
                  borderLeft: "2px solid #3b82f6",
                }}
              >
                Merco 2026
              </p>
            </div>
          </div>

          {/* Right accent shapes */}
          <div
            style={{
              position: "absolute",
              right: 60,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 40,
              opacity: 0.6,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "3px solid #3b82f6",
              }}
            />
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: "2px solid #6366f1",
              }}
            />
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: "2.5px solid #3b82f6",
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
