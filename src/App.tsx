import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StaticPosts from "./pages/StaticPosts";
import UserPosts from "./pages/UserPosts";
import UserProvider from "./context/UserContext";
import { AuthLoader } from "./loaders/authLoader";

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
    loader: AuthLoader,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UserPosts />
      },
      {
        path: "/static-posts",
        element: <StaticPosts />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-4">
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </div>
  );
};

export default App;
