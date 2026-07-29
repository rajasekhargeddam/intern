import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UserPostsList from "../components/post/UserPostsList";
import FailedView from "../components/common/FailedView";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";

import { deletePost } from "../services/posts";
import {fetchLikedPosts} from "../services/fetchProfile"

const LikedPosts = () => {
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["liked-posts"],
    queryFn: fetchLikedPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["liked-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const onDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  if (isLoading) {
    return <UserPostsShimmer />;
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <UserPostsList
      posts={posts}
      onDeletePost={onDeletePost}
    />
  );
};

export default LikedPosts;