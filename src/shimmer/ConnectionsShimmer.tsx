const ConnectionsShimmer = () => {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex w-full animate-pulse items-center gap-3 px-5 py-3"
        >
          {/* Profile Picture Skeleton */}
          <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />

          {/* Text Content Skeleton */}
          <div className="min-w-0 flex-1 space-y-2">
            {/* Full Name Skeleton */}
            <div className="h-4 w-3/5 rounded bg-gray-200" />

            {/* Username Skeleton */}
            <div className="h-3.5 w-2/5 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsShimmer;
