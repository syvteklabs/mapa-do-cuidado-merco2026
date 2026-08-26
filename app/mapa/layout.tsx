import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Mapa e painel de dados | Mapa do Cuidado",
  description: "Explore o mapa interativo e os dados agregados sobre percepção dos caminhos do cuidado no Noroeste Fluminense. Participações por município e temas observados.",
  alternates: {
    canonical: `${baseUrl}/mapa`,
  },
  openGraph: {
    title: "Mapa e painel de dados | Mapa do Cuidado",
    description: "Explore os dados agregados sobre os caminhos do cuidado no Noroeste Fluminense.",
    url: `${baseUrl}/mapa`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Painel de dados e mapa do Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa e painel de dados | Mapa do Cuidado",
    description: "Explore os dados agregados sobre os caminhos do cuidado.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
