import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  const user = useLoaderData();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header username={user.username} />
      <Outlet />
    </>
  );
};

export default MainLayout;
