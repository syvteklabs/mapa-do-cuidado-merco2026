import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Contato | Mapa do Cuidado",
  description: "Entre em contato conosco sobre o Mapa do Cuidado. Dúvidas, sugestões ou informações sobre a Escuta Participativa.",
  alternates: {
    canonical: `${baseUrl}/contato`,
  },
  openGraph: {
    title: "Contato | Mapa do Cuidado",
    description: "Entre em contato conosco sobre o Mapa do Cuidado.",
    url: `${baseUrl}/contato`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Contato do Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Mapa do Cuidado",
    description: "Entre em contato conosco.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
