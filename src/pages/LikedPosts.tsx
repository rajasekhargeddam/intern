import { useQuery } from "@tanstack/react-query";

import UserPostsList from "../components/post/UserPostsList";
import FailedView from "../components/common/FailedView";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";

import { fetchLikedPosts } from "../services/profile";
import useDeletePostMutation from "../hooks/useDeletePostMutation";

const LikedPosts = () => {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["liked-posts"],
    queryFn: fetchLikedPosts,
  });

  const deletePostMutation = useDeletePostMutation([
    ["liked-posts"],
    ["posts"],
  ]);

  const onDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  if (isLoading) {
    return <UserPostsShimmer />;
  }

  if (isError) {
    return <FailedView />;
  }

  return <UserPostsList posts={posts} onDeletePost={onDeletePost} />;
};

export default LikedPosts;
