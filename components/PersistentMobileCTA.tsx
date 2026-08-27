"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PersistentMobileCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Determine if we should show the CTA
  // Hide on participar pages and acessibilidade page
  const shouldHide =
    pathname?.includes("/participar") ||
    pathname?.includes("/acessibilidade") ||
    pathname?.includes("/privacidade") ||
    pathname?.includes("/expansao");

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || shouldHide || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content overlap - only on mobile */}
      <div className="h-24 md:h-0" aria-hidden="true" />

      {/* Fixed CTA Button */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-2 border-gray-200 shadow-2xl z-40 safe-area-bottom"
        style={{
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="px-4 py-3 sm:py-4">
          <Link
            href="/participar"
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 sm:py-5 rounded-lg text-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Participar no Mapa do Cuidado - leva 2 minutos"
          >
            <span className="block text-sm sm:text-base">Participar</span>
            <span className="block text-xs text-blue-100 font-normal">2 minutos</span>
          </Link>
        </div>
      </div>
    </>
  );
}
