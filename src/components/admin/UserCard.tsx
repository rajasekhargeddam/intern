import { Link } from "react-router-dom";
import type { User } from "../../types/auth";

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative">
      <div className="flex items-center gap-4">
        <Link to={`/admin/user/${user._id}`}>
          <img
            src={user.profilePicture}
            alt={user.username}
            className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold text-gray-800 break-all">
              {user.username}
            </h3>

            <p className="text-sm text-gray-500 break-all">{user.email}</p>

            <div className="mt-2 flex gap-2">
              {user.gender && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {user.gender}
                </span>
              )}

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium absolute top-5 right-5 ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
