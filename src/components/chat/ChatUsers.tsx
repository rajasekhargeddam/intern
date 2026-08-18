import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChatUsers, getChatConnectionUsers } from "../../services/chat";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import type { Chat, User } from "../../types";

const ChatUsers = () => {
  const { user } = useContext(UserContext);

  const {
    data: chatUsers = [],
    isLoading: chatLoading,
    isError: chatError,
  } = useQuery({
    queryKey: ["chatUsers"],
    queryFn: () => getChatUsers(),
    enabled: !!user?._id,
  });

  const {
    data: connectionUsers = [],
    isLoading: connectionLoading,
    isError: connectionError,
  } = useQuery({
    queryKey: ["chatConnectionUsers"],
    queryFn: () => getChatConnectionUsers(),
    enabled: !!user?._id,
  });

  if (chatLoading || connectionLoading) {
    return <div>Loading...</div>;
  }

  if (chatError || connectionError) {
    return <div>Error loading users.</div>;
  }

  return (
    <aside className="w-full h-full border-r bg-white flex flex-col">
      <h2 className="p-4 text-xl font-semibold border-b shrink-0">Chats</h2>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Chat Users Section */}
        {chatUsers.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              ACTIVE CHATS
            </div>
            {chatUsers.map((chat: Chat) => (
              <NavLink
                key={chat._id}
                to={`/chat/${chat.targetUser._id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 hover:bg-gray-100 transition ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                <img
                  src={chat.targetUser.profilePicture}
                  alt={chat.targetUser.username}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {chat.targetUser.username}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {chat.lastMessage?.text || "No messages yet"}
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        )}

        {/* Connection Users Section */}
        {connectionUsers.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              AVAILABLE CONNECTIONS
            </div>
            {connectionUsers.map((user: User) => (
              <NavLink
                key={user._id}
                to={`/chat/${user._id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 hover:bg-gray-100 transition ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.username}</div>
                  <div className="text-xs text-slate-500 truncate">
                    Start conversation
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        )}

        {chatUsers.length === 0 && connectionUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No chats or available connections
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatUsers;
