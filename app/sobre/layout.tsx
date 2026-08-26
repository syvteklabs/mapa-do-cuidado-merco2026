import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Sobre o projeto | Mapa do Cuidado",
  description: "Conheça a Escuta Participativa do Mapa do Cuidado: uma iniciativa de pesquisa participativa para compreender os caminhos do cuidado no Noroeste Fluminense.",
  alternates: {
    canonical: `${baseUrl}/sobre`,
  },
  openGraph: {
    title: "Sobre o projeto | Mapa do Cuidado",
    description: "Conheça a Escuta Participativa do Mapa do Cuidado.",
    url: `${baseUrl}/sobre`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Sobre o Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre o projeto | Mapa do Cuidado",
    description: "Conheça a iniciativa de pesquisa participativa.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
