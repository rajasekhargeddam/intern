import type { User } from "../../types";
import NoUsersView from "../common/NoUsersView.tsx";
import UserCard from "./UserCard";

type UserFeedListProps = {
  users: User[];
  invalidateQueryKeys?: readonly (readonly unknown[])[];
};

const UserFeedList = ({ users, invalidateQueryKeys }: UserFeedListProps) => {
  if (users.length === 0) {
    return <NoUsersView />;
  }

  return (
    <ul className="mx-auto flex w-full max-w-3xl list-none flex-col gap-3 px-4 py-4 sm:px-6">
      {users.map((user) => (
        <li
          key={user._id}
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <div className="px-4 py-3">
            <UserCard user={user} invalidateQueryKeys={invalidateQueryKeys} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserFeedList;
