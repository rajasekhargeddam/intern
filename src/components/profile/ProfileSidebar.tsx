import { NavLink } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineBookmark,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const navItems: { label: string; path: string; icon: IconType }[] = [
  {
    label: "Profile",
    path: "/profile",
    icon: HiOutlineUser,
  },
  {
    label: "Liked Posts",
    path: "/profile/liked-posts",
    icon: HiOutlineHeart,
  },
  {
    label: "Saved Posts",
    path: "/profile/saved-posts",
    icon: HiOutlineBookmark,
  },
];

const ProfileSidebar = () => {
  return (
    <nav>
      <ul className="space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/profile"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={18} aria-hidden className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
