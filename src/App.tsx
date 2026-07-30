import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StaticPosts from "./pages/StaticPosts";
import UserPosts from "./pages/UserPosts";
import UserProvider from "./context/UserContext";
import { AuthLoader } from "./loaders/authLoader";
import Profile from "./pages/Profile";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Users from "./pages/admin/Users";
import UserProfile from "./pages/admin/UserProfile";
import { Toaster } from "sonner";
import PostDetails from "./pages/PostDetails";
import LikedPosts from "./pages/LikedPosts";
import ProfileLayout from "./layouts/ProfileLayout";
import UserDetails from "./pages/UserDetails";
import NotificationsPage from "./pages/NotificationsPage";

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
    loader: AuthLoader,
    element: <ProtectedLayout />,
    children: [
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "liked-posts",
            element: <LikedPosts />,
          },
        ],
      },

      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <UserPosts />,
          },
          {
            path: "static-posts",
            element: <StaticPosts />,
          },
          {
            path: "user/:userId",
            element: <UserDetails />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
        ],
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
      },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: "user/:userId",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-4">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Toaster richColors position="top-right" />
          <RouterProvider router={routes} />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
