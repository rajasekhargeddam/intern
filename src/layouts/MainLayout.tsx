import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";

const MainLayout = () => {
  return (
    <div className="flex">
      <div className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-60 overflow-y-auto border-r border-slate-200 bg-white p-3 md:block">
        <SideBar />
      </div>
      <div className="min-w-0 flex-1 bg-slate-50 md:ml-60">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
