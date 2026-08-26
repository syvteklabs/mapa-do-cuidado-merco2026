import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://mapa-do-cuidado-merco2026.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mapa do Cuidado | Escuta participativa no Noroeste Fluminense",
    template: "%s | Mapa do Cuidado",
  },
  description: "Compartilhe anonimamente sua percepção sobre os caminhos do cuidado e ajude a construir um mapa coletivo dos 13 municípios do Noroeste Fluminense.",
  keywords: "saúde, cuidado, noroeste fluminense, participação, pesquisa, escuta participativa, mapa do cuidado",
  authors: [{ name: "SyVtek Care", url: "https://www.syvtek.care" }],
  creator: "SyVtek Care",
  publisher: "SyVtek Care",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Mapa do Cuidado",
    title: "Mapa do Cuidado | Escuta participativa no Noroeste Fluminense",
    description: "Compartilhe anonimamente sua percepção sobre os caminhos do cuidado e ajude a construir um mapa coletivo dos 13 municípios do Noroeste Fluminense.",
    images: [
      {
        url: `${baseUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Mapa do Cuidado - Escuta participativa no Noroeste Fluminense",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@syvtekcare",
    creator: "@syvtekcare",
    title: "Mapa do Cuidado | Escuta participativa no Noroeste Fluminense",
    description: "Compartilhe anonimamente sua percepção sobre os caminhos do cuidado.",
    images: [`${baseUrl}/api/og`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mapa do Cuidado",
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SyVtek Care",
    url: baseUrl,
    logo: `${baseUrl}/syvtek-logo.svg`,
    sameAs: [
      "https://www.syvtek.care",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-24-98820-2020",
      contactType: "Customer Service",
      email: "contact@syvtek.care",
      areaServed: ["Campos", "Macaé", "Cardoso Moreira", "Carapebus", "Conceição de Macabu", "Quissamã", "São Fidélis", "São Francisco de Itabapoana", "São João da Barra", "Trajano de Moraes", "Italva", "Itaperuna", "Miracema"],
      availableLanguage: ["pt-BR"],
    },
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "Mapa do Cuidado",
    description: "Escuta participativa sobre os caminhos do cuidado no Noroeste Fluminense",
    url: baseUrl,
    creator: {
      "@type": "Organization",
      name: "SyVtek Care",
      url: "https://www.syvtek.care",
    },
    areaServed: {
      "@type": "Place",
      name: "Noroeste Fluminense",
      geo: {
        "@type": "GeoShape",
        box: "-42.5 -21.5 -41.5 -21.0",
      },
    },
    keywords: "saúde, cuidado, noroeste fluminense, participação, pesquisa, escuta participativa",
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
