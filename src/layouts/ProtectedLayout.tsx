import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/layout/Header";

const ProtectedLayout = () => {
  const { user, login } = useContext(UserContext);
  const userData = useLoaderData();

  useEffect(() => {
    if (!user && userData) {
      login(userData);
    }
  }, [user, userData, login]);

  if (!user && !userData) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header /> <Outlet />
    </>
  );
};

export default ProtectedLayout;
