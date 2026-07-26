const ProfileShimmer = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 animate-pulse">
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Profile Image */}
        <div className="flex justify-center md:w-1/3 md:justify-start">
          <div className="h-44 w-44 rounded-full bg-gray-200 md:h-52 md:w-52" />
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          {/* Username + Button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-8 w-48 rounded bg-gray-200" />

            <div className="h-10 w-28 rounded-lg bg-gray-200" />
          </div>

          {/* Full Name */}
          <div className="mt-6 h-6 w-56 rounded bg-gray-200" />

          {/* Bio */}
          <div className="mt-4 space-y-3">
            <div className="h-4 w-full max-w-lg rounded bg-gray-200" />
            <div className="h-4 w-11/12 max-w-md rounded bg-gray-200" />
            <div className="h-4 w-8/12 max-w-sm rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200" />
    </div>
  );
};

export default ProfileShimmer;