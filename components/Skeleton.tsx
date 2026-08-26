/**
 * Skeleton Loading Components
 * Used during data loading to prevent layout shifts
 */

interface SkeletonProps {
  className?: string;
}

// Generic skeleton bar
export function SkeletonBar({ className = "h-4 bg-gray-200 rounded" }: SkeletonProps) {
  return <div className={`${className} animate-pulse`} />;
}

// Skeleton for card titles
export function SkeletonTitle({ className = "h-6 w-3/4" }: SkeletonProps) {
  return <div className={`bg-gray-200 rounded ${className} animate-pulse`} />;
}

// Skeleton for paragraph
export function SkeletonParagraph({ className = "space-y-2" }: SkeletonProps) {
  return (
    <div className={className}>
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
    </div>
  );
}

// Skeleton for card
export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 sm:p-8 ${className}`}>
      <SkeletonTitle className="h-6 w-2/3 mb-4" />
      <SkeletonParagraph className="space-y-3" />
    </div>
  );
}

// Skeleton for grid of cards
export function SkeletonCardGrid({ count = 3, columns = "3" }: { count?: number; columns?: string }) {
  const gridClass = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-6 lg:gap-8`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// Skeleton for dashboard stats
export function SkeletonStat() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
      <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
      <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
    </div>
  );
}

// Skeleton for table rows
export function SkeletonTableRows({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i}>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
}

// Skeleton for hero section
export function SkeletonHero() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse" />
      </div>
      <div className="flex gap-4">
        <div className="h-12 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="h-12 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
    </div>
  );
}

// Skeleton for map loading
export function SkeletonMap() {
  return (
    <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-600">Carregando mapa...</p>
      </div>
    </div>
  );
}
