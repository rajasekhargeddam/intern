import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import fetchProfile from "./services/profile";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    loader: fetchProfile,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-4">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
