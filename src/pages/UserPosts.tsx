import { useEffect, useState } from "react";
import { api_status } from "../constants";
import { type UserPost } from "../types/post";
import UserPostsList from "../components/post/UserPostsList";
import FailedView from "../components/common/FailedView";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";
import { fetchOneUserPosts, fetchUserPosts } from "../services/posts";

type UserPostsProps = {
  id?: string;
};

const UserPosts = ({ id }: UserPostsProps) => {
  const [apiStatus, setApiStatus] = useState("");
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  const onDeletePost = (postId: string) => {
    setUserPosts((posts) => posts.filter((post) => post._id !== postId));
  };

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        setApiStatus(api_status.loading);
        let posts: UserPost[] = [];
        if (id) {
          posts = await fetchOneUserPosts(id);
        } else {
          posts = await fetchUserPosts();
        }
        setUserPosts(posts);
        setApiStatus(api_status.success);
      } catch (err) {
        setApiStatus(api_status.failed);
        console.error(err);
      }
    };

    loadUserPosts();
  }, []);

  const showUserPosts = () => {
    switch (apiStatus) {
      case api_status.loading:
        return <UserPostsShimmer />;
      case api_status.success:
        return <UserPostsList posts={userPosts} onDeletePost={onDeletePost} />;
      case api_status.failed:
        return <FailedView />;
    }
  };

  return showUserPosts();
};

export default UserPosts;
