import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ToggleSideBar from "./ToggleSideBar";
import ProfileDropdown from "./ProfileDropdown";
import CreatePostForm from "./create-post/CreatePostForm";

const Header = () => {
  const { user } = useContext(UserContext);
  const adminTag = user?.role === "admin";

  return (
    <div className="py-4 px-8 w-full flex justify-between shadow-sm sticky top-0 left-0 right-0 h-16 z-50 bg-white rounded-2xl">
      <div className="flex items-center gap-2">
        <ToggleSideBar />
        <p className="md:text-2xl">
          Hello, {user?.username}
          {"  "}
          {adminTag && <sup>{user.role}</sup>}
        </p>
      </div>
      <div className="flex gap-2">
        <CreatePostForm />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
