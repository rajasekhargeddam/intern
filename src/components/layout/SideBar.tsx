import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <ul className="space-y-2">
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`group flex items-center gap-3 rounded-xl px-4 py-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                  isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"
                }`}
              >
                ✦
              </span>
              <span>User Posts</span>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/discover">
          {({ isActive }) => (
            <div
              className={`group flex items-center gap-3 rounded-xl px-4 py-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                  isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"
                }`}
              >
                ✦
              </span>
              <span>Discover People</span>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/static-posts">
          {({ isActive }) => (
            <div
              className={`group flex items-center gap-3 rounded-xl px-4 py-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                  isActive ? "bg-white/20" : "bg-blue-50 text-blue-600"
                }`}
              >
                ✧
              </span>
              <span>Static Posts</span>
            </div>
          )}
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;
