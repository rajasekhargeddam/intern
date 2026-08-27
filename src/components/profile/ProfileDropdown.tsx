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
import {
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineLogout,
} from "react-icons/hi";
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
          className="z-60 w-48 rounded-lg border bg-white p-2 shadow-lg"
          sideOffset={8}
        >
          <Item className="cursor-pointer rounded outline-none hover:bg-gray-100">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 text-sm ${
                  isActive ? "font-semibold text-blue-600" : "text-slate-700"
                }`
              }
            >
              <HiOutlineUser size={16} aria-hidden className="shrink-0" />
              My Profile
            </NavLink>
          </Item>

          {user?.role === "admin" && (
            <>
              <Item className="cursor-pointer rounded outline-none hover:bg-gray-100">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 text-sm ${
                      isActive ? "font-semibold text-blue-600" : "text-slate-700"
                    }`
                  }
                >
                  <HiOutlineHome size={16} aria-hidden className="shrink-0" />
                  User Portal
                </NavLink>
              </Item>
              <Item className="cursor-pointer rounded outline-none hover:bg-gray-100">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 text-sm ${
                      isActive ? "font-semibold text-blue-600" : "text-slate-700"
                    }`
                  }
                >
                  <HiOutlineShieldCheck
                    size={16}
                    aria-hidden
                    className="shrink-0"
                  />
                  Admin Portal
                </NavLink>
              </Item>
            </>
          )}

          <Separator className="my-2 h-px bg-gray-200" />

          <Item className="rounded text-red-600 outline-none hover:bg-red-50">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 px-3 py-2 text-sm outline-none"
              onClick={() => handleLogout()}
            >
              <HiOutlineLogout size={16} aria-hidden className="shrink-0" />
              Logout
            </button>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
}

export default ProfileDropdown;
