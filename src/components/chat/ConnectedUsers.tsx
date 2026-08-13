import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getConnections } from "../../services/connections";
import type { UserConnection } from "../../types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ConnectedUsers = () => {
  const { user } = useContext(UserContext);
  const userId = user?._id || "";
  const {
    data: connections = [],
    isLoading,
    isError,
  } = useQuery<UserConnection[]>({
    queryKey: ["connections", userId],
    queryFn: () => getConnections(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading connections.</div>;
  }

  return (
    <aside className="w-80 border-r overflow-y-auto">
      <h2 className="p-4 text-xl font-semibold border-b">Connections</h2>

      {connections.map((connection) => (
        <NavLink
          key={connection._id}
          to={`/chat/${connection.user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 hover:bg-gray-100 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <img
            src={connection.user.profilePicture}
            alt={connection.user.username}
            className="w-12 h-12 rounded-full object-cover"
          />

          <span className="font-medium">{connection.user.username}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default ConnectedUsers;
