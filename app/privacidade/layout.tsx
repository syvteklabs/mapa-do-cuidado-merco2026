import type { Metadata } from "next";

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const metadata: Metadata = {
  title: "Política de Privacidade | Mapa do Cuidado",
  description: "Entenda como protegemos sua privacidade e como seus dados são utilizados no Mapa do Cuidado.",
  alternates: {
    canonical: `${baseUrl}/privacidade`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
