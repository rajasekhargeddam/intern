import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineDocumentText,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const navItems: { to: string; label: string; icon: IconType }[] = [
  { to: "/", label: "User Posts", icon: HiOutlineHome },
  { to: "/discover", label: "Discover People", icon: HiOutlineUsers },
  { to: "/search", label: "Search", icon: HiOutlineSearch },
  { to: "/static-posts", label: "Static Posts", icon: HiOutlineDocumentText },
];

const SideBar = () => {
  return (
    <ul className="space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink to={to} end={to === "/"}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon size={16} aria-hidden />
                </span>
                <span className="truncate">{label}</span>
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
