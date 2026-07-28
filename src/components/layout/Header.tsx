import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ToggleSideBar from "./ToggleSideBar";
import ProfileDropdown from "../profile/ProfileDropdown";
import CreatePostForm from "../post/CreatePostForm";

const Header = () => {
  const { user } = useContext(UserContext);
  const adminTag = user?.role === "admin";

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-sm px-8 h-16 flex items-center justify-between">
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
