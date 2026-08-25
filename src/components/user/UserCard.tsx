import { Link } from "react-router-dom";

import type { User } from "../../types";
import RelationshipButton from "../profile/RelationshipButton";

type UserCardProps = {
  user: User;
  invalidateQueryKeys?: readonly (readonly unknown[])[];
};

const UserCard = ({
  user,
  invalidateQueryKeys = [["user-feed"]],
}: UserCardProps) => {
  const displayName = [user.firstname, user.lastname].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Link
        to={`/user/${user._id}`}
        className="flex min-w-0 flex-1 items-center gap-3 transition-opacity hover:opacity-90"
      >
        <img
          src={user.profilePicture}
          alt={user.username}
          className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            {user.username}
          </p>

          {displayName && (
            <p className="truncate text-sm text-slate-500">{displayName}</p>
          )}

          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {user.bio?.trim() || "No bio yet."}
          </p>
        </div>
      </Link>

      {user.relationship && (
        <div className="shrink-0 sm:pl-4">
          <RelationshipButton
            relationship={user.relationship}
            profileUserId={user._id}
            invalidateQueryKeys={invalidateQueryKeys}
          />
        </div>
      )}
    </div>
  );
};

export default UserCard;
