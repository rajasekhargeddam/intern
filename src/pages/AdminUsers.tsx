import { useEffect, useState } from "react";
import { ADMIN_USERS } from "../constants/api";
import { api_status } from "../constants/const-data";
import AdminUsersShimmer from "../shimmerUi/AdminUsersShimmer";
import FailedView from "../components/FailedView";
import type { User } from "../types/auth";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    const fetchUsersData = async () => {
      setApiStatus(api_status.loading);

      try {
        const response = await fetch(ADMIN_USERS, { credentials: "include" });

        const usersData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch user accounts");
        }

        setUsers(usersData.data);
        setApiStatus(api_status.success);
      } catch (err) {
        setApiStatus(api_status.failed);
        console.log(err);
      }
    };

    fetchUsersData();
  }, []);

  const renderUsersList = () => {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-4 border-b border-gray-200 p-4 last:border-b-0 sm:p-5"
          >
            <img
              src={user.profilePicture}
              alt={`${user.username}`}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm text-gray-800">{user.username}</p>
              <p className="truncate text-sm text-gray-500">{user.email}</p>

              <p className="mt-1 text-xs text-gray-400">{user.gender}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case api_status.loading:
        return <AdminUsersShimmer />;

      case api_status.success:
        return renderUsersList();

      case api_status.failed:
        return <FailedView />;

      default:
        return null;
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">User Accounts</h2>

        <p className="mt-1 text-sm text-gray-500">All registered users</p>
      </div>

      {renderContent()}
    </section>
  );
};

export default AdminUsers;
