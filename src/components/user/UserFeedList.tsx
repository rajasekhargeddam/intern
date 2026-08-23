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
    <ul className="mx-auto flex w-full max-w-6xl list-none flex-col gap-6 px-4 py-8 sm:w-3/4 sm:px-6 lg:w-3/5">
      {users.map((user) => (
        <li
          key={user._id}
          className="w-full overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <UserCard user={user} invalidateQueryKeys={invalidateQueryKeys} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserFeedList;
