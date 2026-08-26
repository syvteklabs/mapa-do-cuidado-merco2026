import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Acessibilidade | Mapa do Cuidado",
  description: "Informações sobre acessibilidade do Mapa do Cuidado. Navegação por teclado, suporte a leitores de tela e design responsivo.",
  alternates: {
    canonical: `${baseUrl}/acessibilidade`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
