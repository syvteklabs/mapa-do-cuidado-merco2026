import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Expansão para sua região | Mapa do Cuidado",
  description: "Interesse em levar a Escuta Participativa para sua região? Nos conte sobre sua experiência e localidade.",
  alternates: {
    canonical: `${baseUrl}/expansao`,
  },
  openGraph: {
    title: "Expansão para sua região | Mapa do Cuidado",
    description: "Interesse em levar a Escuta Participativa para sua região? Nos conte sobre sua experiência e localidade.",
    url: `${baseUrl}/expansao`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Expansão do Mapa do Cuidado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expansão para sua região | Mapa do Cuidado",
    description: "Interesse em levar a Escuta Participativa para sua região?",
    images: [`${baseUrl}/api/og`],
  },
};

export default function ExpansionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
