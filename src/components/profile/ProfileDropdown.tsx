import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../services/auth";

function ProfileDropdown() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/auth/login", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Root>
      <Trigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200"
        >
          <img
            className="h-full w-full object-cover"
            src={user?.profilePicture}
            alt="profile"
          />
        </button>
      </Trigger>

      <Portal>
        <Content
          className="bg-white rounded-lg shadow-lg border p-2 w-48 z-60"
          sideOffset={8}
        >
          <Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer outline-none">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : ""
              }
            >
              My Profile
            </NavLink>
          </Item>

          {user?.role === "admin" && (
            <>
              <Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer outline-none">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : ""
                  }
                >
                  user portal
                </NavLink>
              </Item>
              <Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer outline-non">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : ""
                  }
                >
                  Admin Portal
                </NavLink>
              </Item>
            </>
          )}

          <Separator className="h-px bg-gray-200 my-2" />

          <Item className="px-3 py-2 rounded text-red-600 hover:bg-red-50">
            <button
              type="button"
              className="w-full flex justify-center items-center cursor-pointer outline-none"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
}

export default ProfileDropdown;
