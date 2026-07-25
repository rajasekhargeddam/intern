import { useEffect, useState } from "react";
import { api_status } from "../constants";
import { type UserPost } from "../types/post";
import UserPostsList from "../components/UserPostsList";
import FailedView from "../components/FailedView";
import UserPostsShimmer from "../shimmerUi/UserPostsShimmer";
import { fetchUserPosts } from "../services/posts";

const UserPosts = () => {
  const [apistate, setApistate] = useState("");
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        setApistate(api_status.loading);
        const posts = await fetchUserPosts();
        setUserPosts(posts);
        setApistate(api_status.success);
      } catch (err) {
        setApistate(api_status.failed);
        console.log(err);
      }
    };

    loadUserPosts();
  }, []);

  const showUserPosts = () => {
    switch (apistate) {
      case api_status.loading:
        return <UserPostsShimmer />;
      case api_status.success:
        return <UserPostsList posts={userPosts} />;
      case api_status.failed:
        return <FailedView />;
    }
  };

  return showUserPosts();
};

export default UserPosts;
