import { useEffect, useState } from "react";
import { api_status } from "../../constants";
import AdminUsersShimmer from "../../shimmer/AdminUsersShimmer";
import FailedView from "../../components/common/FailedView";
import type { User } from "../../types/auth";
import UserCard from "../../components/admin/UserCard";
import CreateUserDialog from "../../components/admin/CreateUserDialog";
import { fetchAdminUsers } from "../../services/admin";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    const fetchUsersData = async () => {
      setApiStatus(api_status.loading);

      try {
        const usersData = await fetchAdminUsers();

        setUsers(usersData);
        setApiStatus(api_status.success);
      } catch (err) {
        console.error(err);
        setApiStatus(api_status.failed);
      }
    };

    fetchUsersData();
  }, []);

  const renderUsersList = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
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
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

          <p className="mt-2 text-gray-500">
            View and manage all registered users.
          </p>
        </div>
        <div>
          <CreateUserDialog />
        </div>
      </div>

      {renderContent()}
    </section>
  );
};

export default Users;
