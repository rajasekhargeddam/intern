import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import BackButton from "../components/BackButton";

const ProfileLayout = () => {
  return (
    <div className="flex h-screen pt-16">
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white p-5 shadow-sm hidden md:block">
        <ProfileSidebar />
      </div>
      <div className="min-w-0 flex-1 overflow-y-auto bg-gray-50 md:ml-64">
        <BackButton path="/" />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
