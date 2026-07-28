import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AdminLayout = () => {
  const { user } = useContext(UserContext);

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    // <div className="min-h-screen bg-gray-50">

    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Outlet />
    </main>
    // </div>
  );
};

export default AdminLayout;
