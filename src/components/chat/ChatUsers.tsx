import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChatUsers, getChatConnectionUsers } from "../../services/chat";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import type { Chat, User } from "../../types";
import useChatPresence from "../../hooks/useChatPresence";
import OnlineAvatar from "./OnlineAvatar";

const ChatUsers = () => {
  const { user } = useContext(UserContext);
  useChatPresence();

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
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  if (chatError || connectionError) {
    return (
      <div className="p-4 text-sm text-red-600">Error loading users.</div>
    );
  }

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-white">
      <h2 className="shrink-0 border-b border-slate-200 px-4 py-3 text-base font-semibold">
        Chats
      </h2>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {chatUsers.length > 0 && (
          <>
            <div className="bg-slate-50 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-slate-500">
              ACTIVE CHATS
            </div>
            {chatUsers.map((chat: Chat) => (
              <NavLink
                key={chat._id}
                to={`/chat/${chat.targetUser._id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 transition hover:bg-slate-50 ${
                    isActive ? "bg-blue-50" : ""
                  }`
                }
              >
                <OnlineAvatar
                  src={chat.targetUser.profilePicture}
                  alt={chat.targetUser.username}
                  isOnline={chat.targetUser.isOnline}
                />

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {chat.targetUser.username}
                  </div>
                  {chat.lastMessage?.text && (
                    <div className="truncate text-xs text-slate-500">
                      {chat.lastMessage.text}
                    </div>
                  )}
                </div>
              </NavLink>
            ))}
          </>
        )}

        {connectionUsers.length > 0 && (
          <>
            <div className="bg-slate-50 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-slate-500">
              AVAILABLE CONNECTIONS
            </div>
            {connectionUsers.map((chatUser: User) => (
              <NavLink
                key={chatUser._id}
                to={`/chat/${chatUser._id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 transition hover:bg-slate-50 ${
                    isActive ? "bg-blue-50" : ""
                  }`
                }
              >
                <OnlineAvatar
                  src={chatUser.profilePicture}
                  alt={chatUser.username}
                  isOnline={chatUser.isOnline}
                />

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {chatUser.username}
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        )}

        {chatUsers.length === 0 && connectionUsers.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            No chats or available connections
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatUsers;
