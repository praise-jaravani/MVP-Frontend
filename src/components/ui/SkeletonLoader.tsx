

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

export default function SkeletonLoader({ className = '', count = 1 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-700/30 rounded animate-pulse shimmer ${className}`}
        />
      ))}
    </>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-5 border-t-2 border-t-gray-600">
      <SkeletonLoader className="h-4 w-24 mb-4" />
      <SkeletonLoader className="h-8 w-16 mb-2" />
      <SkeletonLoader className="h-3 w-32" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 7 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-700/30">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <SkeletonLoader className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}
