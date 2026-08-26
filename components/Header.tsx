"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/como-funciona", label: "Como funciona" },
    { href: "/participar", label: "Participar" },
    { href: "/mapa", label: "Mapa" },
    { href: "/expansao", label: "Expansão" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="6" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="1.5" fill="#3b82f6" />
                <circle cx="16" cy="6" r="1.5" fill="#6366f1" />
                <circle cx="22" cy="12" r="1.5" fill="#3b82f6" />
                <circle cx="18" cy="18" r="1.5" fill="#6366f1" />
                <circle cx="10" cy="20" r="1.5" fill="#3b82f6" />
                <line x1="8" y1="8" x2="16" y2="6" stroke="#a5b4fc" strokeWidth="1" opacity="0.7" />
                <line x1="16" y1="6" x2="22" y2="12" stroke="#a5b4fc" strokeWidth="1" opacity="0.7" />
                <line x1="22" y1="12" x2="18" y2="18" stroke="#a5b4fc" strokeWidth="1" opacity="0.7" />
                <line x1="18" y1="18" x2="10" y2="20" stroke="#a5b4fc" strokeWidth="1" opacity="0.7" />
                <line x1="10" y1="20" x2="8" y2="8" stroke="#a5b4fc" strokeWidth="1" opacity="0.7" />
                <circle cx="14" cy="13" r="4" fill="none" stroke="url(#headerLogoGradient)" strokeWidth="1" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-blue-600">SyVtek Care</span>
              <span className="text-sm font-bold text-gray-900 leading-none">Mapa do Cuidado</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
