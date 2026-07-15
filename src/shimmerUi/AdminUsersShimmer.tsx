const AdminUsersShimmer = () => {
  return (
    <section>
      <div className="mb-6">
        <div className="h-8 w-44 animate-pulse rounded-md bg-gray-200" />

        <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-gray-200 p-4 last:border-b-0 sm:p-5"
          >
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />

            <div className="w-full">
              <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-3 w-52 max-w-full animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminUsersShimmer;
