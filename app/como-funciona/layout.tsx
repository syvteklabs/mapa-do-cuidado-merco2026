import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Como funciona | Mapa do Cuidado",
  description: "Conheça o processo da Escuta Participativa: como funciona, quais são os 13 municípios do Noroeste Fluminense e como seus dados são utilizados.",
  alternates: {
    canonical: `${baseUrl}/como-funciona`,
  },
  openGraph: {
    title: "Como funciona | Mapa do Cuidado",
    description: "Entenda o processo da Escuta Participativa no Noroeste Fluminense.",
    url: `${baseUrl}/como-funciona`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Como funciona o Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Como funciona | Mapa do Cuidado",
    description: "Entenda o processo da Escuta Participativa.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
