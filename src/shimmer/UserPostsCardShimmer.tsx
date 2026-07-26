const UserPostsCardShimmer = () => {
  return (
    <li className="w-full bg-white rounded-lg border border-slate-200/80 shadow-sm overflow-hidden list-none">
      <div className="flex flex-col gap-4 p-4 sm:p-6 animate-pulse">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-11 rounded-full bg-slate-200" />

            <div className="h-5 w-24 sm:w-32 bg-slate-200 rounded-md" />
          </div>

          <div className="h-4 w-16 bg-slate-200 rounded-md" />
        </div>

        <div className="space-y-2.5 py-1">
          <div className="h-4 bg-slate-200 rounded-md w-full" />
          <div className="h-4 bg-slate-200 rounded-md w-11/12" />
          <div className="h-4 bg-slate-200 rounded-md w-4/5" />
        </div>

        <div className="w-full">
          <div className="w-full h-48 sm:h-64 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </li>
  );
};

export default UserPostsCardShimmer;
