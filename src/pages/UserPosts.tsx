import { useEffect, useState } from "react";
import { POSTS_API } from "../constants/api";
import { type UserPost } from "../types/post";
import { api_status } from "../constants/const-data";
import UserPostsList from "../components/UserPostsList";
import FailedView from "../components/FailedView";
import UserPostsShimmer from "../shimmerUi/UserPostsShimmer";

const UserPosts = () => {
  const [apistate, setApistate] = useState("");
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setApistate(api_status.loading);
        const respose = await fetch(POSTS_API, { credentials: "include" });
        if (!respose.ok) {
          throw new Error("Failed to fetch user posts");
        }
        const data = await respose.json();
        setUserPosts(data.posts);
        setApistate(api_status.success);
      } catch (err) {
        setApistate(api_status.failed);
        console.log(err);
      }
    };

    fetchUserPosts();
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
