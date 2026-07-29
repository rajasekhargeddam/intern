import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="flex pt-16 h-screen">
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white p-5 shadow-sm hidden md:block">
        <ProfileSidebar />
      </div>
      <div className="md:ml-64 flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
