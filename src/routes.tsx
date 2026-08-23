import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import ChatLayout from "./layouts/ChatLayout";

import { AuthLoader } from "./loaders/authLoader";

import {
  Login,
  SignUp,
  UserPosts,
  UserFeed,
  StaticPosts,
  UserDetails,
  Profile,
  LikedPosts,
  SavedPosts,
  NotificationsPage,
  PostDetails,
  Users,
  UserProfile,
  Chat,
} from "./lazyPages";

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
          {
            path: "saved-posts",
            element: <SavedPosts />,
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
            path: "discover",
            element: <UserFeed />,
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

      {
        path: "chat",
        element: <ChatLayout />,
        children: [
          {
            index: true,
            element: <Chat />,
          },
          {
            path: ":userId",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

export default routes;
