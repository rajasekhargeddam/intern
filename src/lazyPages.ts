import { lazy } from "react";

export const Login = lazy(() => import("./pages/Login"));
export const SignUp = lazy(() => import("./pages/SignUp"));

export const UserPosts = lazy(() => import("./pages/UserPosts"));
export const UserFeed = lazy(() => import("./pages/UserFeed"));
export const StaticPosts = lazy(() => import("./pages/StaticPosts"));
export const UserDetails = lazy(() => import("./pages/UserDetails"));

export const Profile = lazy(() => import("./pages/Profile"));
export const LikedPosts = lazy(() => import("./pages/LikedPosts"));
export const SavedPosts = lazy(() => import("./pages/SavedPosts"));


export const NotificationsPage = lazy(
  () => import("./pages/NotificationsPage"),
);

export const PostDetails = lazy(() => import("./pages/PostDetails"));

export const Users = lazy(() => import("./pages/admin/Users"));
export const UserProfile = lazy(() => import("./pages/admin/UserProfile"));

export const Chat = lazy(() => import("./components/chat/Chat"));
