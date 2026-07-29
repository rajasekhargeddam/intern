import { NavLink } from "react-router-dom";
import { FaUser, FaHeart } from "react-icons/fa";

const navItems = [
  {
    label: "Profile",
    path: "/profile",
    icon: FaUser,
  },
  {
    label: "Liked Posts",
    path: "/profile/liked-posts",
    icon: FaHeart,
  },
  //   {
  //     label: "Saved Posts",
  //     path: "/profile/saved-posts",
  //     icon: FaBookmark,
  //   },
  //   {
  //     label: "Settings",
  //     path: "/profile/settings",
  //     icon: FaCog,
  //   },
];

const ProfileSidebar = () => {
  return (
    <aside className="sticky top-20 h-fit">
      <nav>
        <ul className="space-y-2">
          {navItems.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/profile"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
