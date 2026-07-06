import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LOGOUT_API } from "../constants/api";
import { UserContext } from "../context/UserContext";
import CreatePostForm from "./CreatePostForm";
import ToggleSideBar from "./ToggleSideBar";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const onlogout = async () => {
    try {
      const response = await fetch(LOGOUT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
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
    <div className="py-4 px-8 w-full flex justify-between shadow-sm fixed top-0 left-0 right-0 h-16 z-50 bg-white rounded-2xl">
      <p className="md:text-2xl">Hello, {user?.username}</p>
      <div className="flex gap-2">
        <CreatePostForm />
        <button
          type="button"
          className="hidden md:block border rounded-md py-1 px-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => onlogout()}
        >
          Logout
        </button>
        <ToggleSideBar onLogout={onlogout} />
      </div>
    </div>
  );
};

export default Header;
