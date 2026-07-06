import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import SideBar from "../components/SideBar.tsx";

const MainLayout = () => {
  const { user, login } = useContext(UserContext);
  const userData = useLoaderData();

  useEffect(() => {
    if (!user && userData) {
      login(userData);
    }
  }, [userData, user, login]);

  if (!user && !userData) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header />
      <div className="flex pt-16 h-screen">
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white p-5 shadow-sm hidden md:block">
          <SideBar />
        </div>
        <div className="md:ml-64 flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
