import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Termos de Uso | Mapa do Cuidado",
  description: "Conheça os termos e condições de uso do Mapa do Cuidado.",
  alternates: {
    canonical: `${baseUrl}/termos`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
