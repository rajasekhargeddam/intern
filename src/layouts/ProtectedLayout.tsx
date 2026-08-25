import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/layout/Header";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import SideBar from "../components/layout/SideBar";
import { disconnectSocket, getSocket } from "../utils/socket";

const ProtectedLayout = () => {
  const { user, login } = useContext(UserContext);
  const userData = useLoaderData();
  const location = useLocation();

  const isProfileRoute = location.pathname.startsWith("/profile");

  useEffect(() => {
    if (!user && userData) {
      login(userData);
    }
  }, [user, userData, login]);

  useEffect(() => {
    if (!user && !userData) return;

    getSocket();

    return () => {
      disconnectSocket();
    };
  }, [user, userData]);

  if (!user && !userData) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header sidebar={isProfileRoute ? <ProfileSidebar /> : <SideBar />} />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
