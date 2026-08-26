import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Compartilhar sua experiência | Mapa do Cuidado",
  description: "Participe da escuta sobre os caminhos do cuidado no Noroeste Fluminense. Formulário rápido, anônimo e voluntário.",
  alternates: {
    canonical: `${baseUrl}/participar`,
  },
  openGraph: {
    title: "Compartilhar sua experiência | Mapa do Cuidado",
    description: "Participe da escuta sobre os caminhos do cuidado no Noroeste Fluminense. Formulário rápido, anônimo e voluntário.",
    url: `${baseUrl}/participar`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Participe da escuta do Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compartilhar sua experiência | Mapa do Cuidado",
    description: "Participe da escuta sobre os caminhos do cuidado.",
    images: [`${baseUrl}/api/og`],
  },
};

export default function ParticipateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
