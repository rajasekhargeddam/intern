import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "User Posts", icon: "✦" },
  { to: "/discover", label: "Discover People", icon: "✦" },
  { to: "/search", label: "Search", icon: "⌕" },
  { to: "/static-posts", label: "Static Posts", icon: "✧" },
];

const SideBar = () => {
  return (
    <ul className="space-y-1">
      {navItems.map(({ to, label, icon }) => (
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
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-sm ${
                    isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {icon}
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
