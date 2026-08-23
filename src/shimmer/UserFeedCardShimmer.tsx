const UserFeedCardShimmer = () => {
  return (
    <li className="w-full overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm list-none">
      <div className="flex animate-pulse flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200 sm:h-16 sm:w-16" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-5 w-32 rounded-md bg-slate-200 sm:w-40" />
            <div className="h-4 w-24 rounded-md bg-slate-200" />
            <div className="h-4 w-full rounded-md bg-slate-200" />
            <div className="h-4 w-4/5 rounded-md bg-slate-200" />
          </div>
        </div>
        <div className="h-9 w-28 shrink-0 rounded-lg bg-slate-200" />
      </div>
    </li>
  );
};

export default UserFeedCardShimmer;
