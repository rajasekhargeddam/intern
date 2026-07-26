const ShimmerCard = () => {
  return (
    <li className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-55 animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg w-3/4 animate-pulse mb-2"></div>

        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded-lg w-5/6 animate-pulse"></div>

          <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-9/12 animate-pulse"></div>
        </div>
      </div>
    </li>
  );
};

export default ShimmerCard;
