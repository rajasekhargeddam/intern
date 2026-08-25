import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import BackButton from "../components/BackButton";

const ProfileLayout = () => {
  return (
    <div className="flex">
      <div className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-60 overflow-y-auto border-r border-slate-200 bg-white p-3 md:block">
        <ProfileSidebar />
      </div>
      <div className="min-w-0 flex-1 overflow-y-auto bg-slate-50 md:ml-60">
        <BackButton path="/" />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
