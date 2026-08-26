import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";
import DemoWatermark from "@/components/DemoWatermark";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mapa-do-cuidado-merco2026.vercel.app"),
  title: "Mapa do Cuidado | SyVtek Care - Noroeste Fluminense",
  description: "Escuta participativa rápida, voluntária e anônima sobre os caminhos do cuidado na região Noroeste Fluminense. Merco 2026.",
  keywords: "saúde, cuidado, noroeste fluminense, participação, pesquisa",
  authors: [{ name: "SyVtek Care" }],
  openGraph: {
    title: "Mapa do Cuidado | SyVtek Care",
    description: "Participação rápida e anônima para mapear os caminhos do cuidado.",
    type: "website",
    locale: "pt_BR",
    url: "https://mapa-do-cuidado-merco2026.vercel.app",
    images: [
      {
        url: "/syvtek-logo.svg",
        width: 200,
        height: 48,
        alt: "SyVtek Care Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa do Cuidado | SyVtek Care",
    description: "Participação rápida e anônima para mapear os caminhos do cuidado.",
    creator: "@syvtekcare",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <DemoBanner />
        <DemoWatermark />
        {children}
      </body>
    </html>
  );
}
