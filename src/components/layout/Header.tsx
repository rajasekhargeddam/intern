import { useContext, type ReactNode } from "react";
import { UserContext } from "../../context/UserContext";
import ToggleSideBar from "./ToggleSideBar";
import ProfileDropdown from "../profile/ProfileDropdown";
// import CreatePostForm from "../post/CreatePostForm";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import CreatePost from "../post/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../services/profile";
import { RiMessengerLine } from "react-icons/ri";

type HeaderProps = {
  sidebar: ReactNode;
};

const Header = ({ sidebar }: HeaderProps) => {
  const { user } = useContext(UserContext);
  const adminTag = user?.role === "admin";

  const { data } = useQuery({
    queryKey: ["notification-count"],
    queryFn: getNotificationCount,
  });

  return (
    <div className="sticky top-0 z-50 h-16 w-full flex items-center justify-between gap-2 bg-white px-3 shadow-sm sm:px-6 md:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <ToggleSideBar>{sidebar}</ToggleSideBar>
        <p className="min-w-0 max-w-[55vw] truncate text-sm sm:text-lg md:text-2xl">
          <Link to="/">Hello</Link>, {user?.username}
          {"  "}
          {adminTag && <sup>{user.role}</sup>}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <CreatePost />

        <Link to="/chat" className="text-xl mx-2">
          <RiMessengerLine />
        </Link>

        <Link
          to="/notifications"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
          <IoNotificationsOutline className="text-[22px] transition-transform duration-200 group-hover:scale-110" />

          {data?.notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
              {data.notificationCount > 99 ? "99+" : data.notificationCount}
            </span>
          )}
        </Link>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
