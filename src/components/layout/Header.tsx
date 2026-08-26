import { useContext, type ReactNode } from "react";
import { UserContext } from "../../context/UserContext";
import ToggleSideBar from "./ToggleSideBar";
import ProfileDropdown from "../profile/ProfileDropdown";
import { Link, useMatch } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import CreatePost from "../post/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../services/profile";
import { getChatUsers } from "../../services/chat";
import { RiMessengerLine } from "react-icons/ri";
import type { Chat } from "../../types";
import useNewChatMessage from "../../hooks/useNewChatMessage";

type HeaderProps = {
  sidebar: ReactNode;
};

const Header = ({ sidebar }: HeaderProps) => {
  const { user } = useContext(UserContext);
  const adminTag = user?.role === "admin";

  useNewChatMessage();

  const { data } = useQuery({
    queryKey: ["notification-count"],
    queryFn: getNotificationCount,
  });

  const { data: chatUsers = [] } = useQuery<Chat[]>({
    queryKey: ["chatUsers"],
    queryFn: getChatUsers,
    enabled: !!user?._id,
  });

  const openChatMatch = useMatch("/chat/:userId");
  const openChatUserId = openChatMatch?.params.userId;

  const hasUnreadChats = chatUsers.some((chat) => {
    if (
      openChatUserId &&
      chat.targetUser._id.toString() === openChatUserId.toString()
    ) {
      return false;
    }

    return (chat.unreadCount ?? 0) > 0;
  });

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <ToggleSideBar>{sidebar}</ToggleSideBar>
        <p className="min-w-0 truncate text-sm font-semibold text-slate-900 sm:text-base">
          <Link to="/" className="hover:text-blue-600">
            Hello
          </Link>
          , {user?.username}
          {adminTag && (
            <sup className="ml-1 text-[10px] font-medium uppercase text-blue-600">
              {user.role}
            </sup>
          )}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <CreatePost />

        <Link
          to="/chat"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
          aria-label="Chat"
        >
          <RiMessengerLine />

          {hasUnreadChats && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Link>

        <Link
          to="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
          aria-label="Notifications"
        >
          <IoNotificationsOutline className="text-[20px]" />

          {data?.notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {data.notificationCount > 99 ? "99+" : data.notificationCount}
            </span>
          )}
        </Link>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
